import {Button, Row, Col, Spin} from 'antd';
import {SwapOutlined} from '@ant-design/icons';
import * as Yup from 'yup';
import {Input, InputSelection} from '../Input';
import {
  useLazyGetEstimatedExchangeAmountQuery, useLazyGetMinimalExchangeAmountQuery,
  useListCurrenciesQuery
} from '../../services/exchange.ts';
import {useCallback, useEffect, useMemo} from 'react';
import {useFormik} from 'formik';
import styles from './styles.module.css';
import {CustomLabel} from '../Input/CustomLabel.tsx';
import {EstimatedExchangeParams} from '../../services/types/requestPayloadTypes.ts';
import {ExchangeFlowEnum, ExchangeTypeEnum} from '../../constants.ts';
import debounce from 'lodash.debounce';
import {Currency} from '../../services/types/responsePayloadTypes.ts';

const validationSchema = Yup.object().shape({
  fromAmount: Yup.number().typeError('Must be a number').required('Amount is required').positive('Must be a positive number'),
  toAmount: Yup.number().typeError('Must be a number').required('Amount is required').positive('Must be a positive number'),
  ethAddress: Yup.string().required('Ethereum address is required')
});

type EstimateExchangeType = {
  type: ExchangeTypeEnum,
  value: number;
}

const ExchangeForm = () => {
  const initialValues = {
    fromAmount: 0,
    fromCurrency: '',
    toCurrency: '',
    toAmount: 0,
    ethAddress: ''
  };

  const onSubmit = (values: typeof initialValues) => {
    console.log('Form values:', values);
  };

  const {
    values,
    handleSubmit,
    setFieldValue,
    touched,
    errors
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit
  });

  const {data: currencies, isLoading} = useListCurrenciesQuery();

  const [getMinimal, { error: exchangeError }] = useLazyGetMinimalExchangeAmountQuery();

  const [getEstimated, {data: estimated}] = useLazyGetEstimatedExchangeAmountQuery();

  const formattedData = useMemo(() => {
    if (!currencies) return [];

    return currencies.map((el) => ({
      icon: el.image,
      value: el.legacyTicker,
      label: <CustomLabel icon={el.image} label={el.legacyTicker}/>
    }));
  }, [currencies]);


  const {from, to} = useMemo(() => {
    const initial = {from: {}, to: {}} as {from: Currency, to: Currency}
    if (!currencies?.length) {
      return initial
    }
    return currencies.reduce<{from: Currency, to: Currency}>((acc, curr) => {
      if (curr.legacyTicker === values.fromCurrency) {
        return {...acc, from: curr};
      }
      if (curr.legacyTicker === values.toCurrency) {
        return {...acc, to: curr};
      }

      return acc
    }, initial)
  }, [currencies, values.fromCurrency, values.toCurrency])


  const debouncedEstimate = useCallback(
    debounce((params: EstimatedExchangeParams) => {
      getEstimated(params);
    }, 500),
    []
  );

  const handleEstimate = (data: EstimateExchangeType) => {
    const params: EstimatedExchangeParams = {
      fromCurrency: values.fromCurrency,
      toCurrency: values.toCurrency,
      type: data.type,
      flow: ExchangeFlowEnum.STANDARD,
      fromNetwork: from.network,
      toNetwork: to.network,
    };
    if (data.type === ExchangeTypeEnum.DIRECT) {
      params.fromAmount = data.value;
    } else {
      params.toAmount = data.value;
      params.flow = ExchangeFlowEnum.FIXED_RATE;
    }

    debouncedEstimate(params);
  };

  useEffect(() => {
    if (formattedData.length) {
      setFieldValue('fromCurrency', formattedData[0]?.value || '')
      setFieldValue('toCurrency', formattedData[1]?.value || '')
    }
  }, [formattedData, setFieldValue])

  useEffect(() => {
    if (values.fromCurrency && values.toCurrency) {
      getMinimal({
        fromCurrency: values.fromCurrency,
        toCurrency: values.toCurrency,
        fromNetwork: from?.network,
        toNetwork: to?.network
      })
        .then(({data}) => {
          setFieldValue('fromAmount', data?.minAmount || 0)
          handleEstimate({type: ExchangeTypeEnum.DIRECT, value: data?.minAmount || 0})
        })
    }

  }, [getMinimal, setFieldValue, values.fromCurrency, values.toCurrency]);

  useEffect(() => {
    if (estimated) {
      if (estimated.type === ExchangeTypeEnum.DIRECT) {
        setFieldValue('toAmount', estimated.toAmount || 0)
      } else {
        setFieldValue('fromAmount', estimated.fromAmount || 0)
      }
    }
  }, [estimated, setFieldValue]);


  if (isLoading) {
    return <Spin/>
  }

  return (
    <form onSubmit={handleSubmit}>
      <Row>
        <Col md={11} span={24}>
          <InputSelection
            options={formattedData}
            onChange={(value) => {
              setFieldValue('fromAmount', value);
              handleEstimate({type: ExchangeTypeEnum.DIRECT, value: Number(value)});
            }}
            selectorValue={{value: values.fromCurrency}}
            selectorOnChange={(value) => setFieldValue('fromCurrency', value)}
            value={values.fromAmount}
            labelInValue={true}
          />
          {touched.fromAmount && errors.fromAmount && (
            <div className={styles.error}>{errors.fromAmount}</div>
          )}
        </Col>

        <Col md={2} className={styles.iconWrapper} span={24}>
          <SwapOutlined className={styles.icon}/>
        </Col>

        <Col md={11} span={24}>
          <InputSelection
            options={formattedData}
            onChange={(value) => {
              setFieldValue('toAmount', value);
              handleEstimate({type: ExchangeTypeEnum.REVERSE, value: Number(value)});
            }}
            selectorValue={{value: values.toCurrency}}
            selectorOnChange={(value) => setFieldValue('toCurrency', value)}
            value={values.toAmount}
            labelInValue={true}
          />
          {touched.toAmount && errors.toAmount && (
            <div className={styles.error}>{errors.toAmount}</div>
          )}
        </Col>
      </Row>

      <Row className={styles.addressWrapper}>
        <Col md={18} span={24}>
          <Input
            label="Your Ethereum address"
            value={values.ethAddress}
            onChange={(e) => setFieldValue('ethAddress', e.target.value)}
          />
          {touched.ethAddress && errors.ethAddress && (
            <div className={styles.error}>{errors.ethAddress}</div>
          )}
        </Col>
        <Col md={{offset: 1, span: 5}} span={24}>
          <Button type="primary" htmlType="submit" className={styles.submit} disabled={!!exchangeError}>
            Exchange
          </Button>
          {exchangeError && <div className={styles.error}>This pair is disabled now</div>}
        </Col>
      </Row>
    </form>
  );
};

export default ExchangeForm;
