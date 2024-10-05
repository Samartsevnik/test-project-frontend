import { Formik, Form, Field, ErrorMessage} from 'formik';
import { Button, Row, Col } from 'antd';
import { SwapOutlined } from '@ant-design/icons';
import * as Yup from 'yup';
import { FieldInputProps } from 'formik/dist/types';
import styles from './styles.module.css';
import { Input, InputSelection } from '../Input';


const validationSchema = Yup.object().shape({
  fromAmount: Yup.number().required('Amount is required').positive('Must be a positive number'),
  toAmount: Yup.number().required('Amount is required').positive('Must be a positive number'),
  ethAddress: Yup.string().required('Ethereum address is required'),
});

const ExchangeForm = () => {
  const initialValues = {
    fromAmount: 0.023,
    fromCurrency: 'ETH',
    toCurrency: 'BTC',
    toAmount: 1.1165462,
    ethAddress: '',
  };

  const handleSubmit = (values: typeof initialValues) => {
    console.log('Form values:', values);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue, values }) => (
        <Form>
          <Row>
            <Col md={11} span={24}>
              <Field name="fromAmount">
                {({ field}: { field: FieldInputProps<number> }) => (
                  <InputSelection
                    {...field}
                    options={[{value: "ETH", label: "ETH"}, {value: "BTC", label: "BTC"}]}
                    onChange={(value) => setFieldValue('fromAmount', value)}
                    selectorValue={values.fromCurrency}
                    selectorOnChange={(value) => setFieldValue('fromCurrency', value)}
                    value={values.fromAmount}
                  />
                )}
              </Field>
              <ErrorMessage name="fromAmount" component="div" className={styles.error} />
            </Col>

            <Col md={2} className={styles.iconWrapper} span={24}>
              <SwapOutlined className={styles.icon} />
            </Col>

            <Col md={11} span={24}>
              <Field name="toAmount">
                {({ field }: { field: FieldInputProps<number> }) => (
                  <InputSelection
                    {...field}
                    options={[{value: "ETH", label: "ETH"}, {value: "BTC", label: "BTC"}]}
                    onChange={(value) => setFieldValue('toAmount', value)}
                    selectorValue={values.toCurrency}
                    selectorOnChange={(value) => setFieldValue('toCurrency', value)}
                    value={values.toAmount}
                  />

                )}
              </Field>
              <ErrorMessage name="toAmount" component="div" className={styles.error} />
            </Col>
          </Row>

          <Row className={styles.addressWrapper}>
            <Col md={18} span={24}>
              <Field name="ethAddress">
                {({ field }: { field: FieldInputProps<string> }) => (
                  <Input
                    {...field}
                    label="Your Ethereum address"
                    value={values.ethAddress}
                    onChange={(e) => setFieldValue('ethAddress', e.target.value)}
                  />
                )}
              </Field>
              <ErrorMessage name="ethAddress" component="div" className={styles.error} />

            </Col>
            <Col md={{offset: 1, span: 5}} span={24}>
              <Button type="primary" htmlType="submit" className={styles.submit}>
                Exchange
              </Button>
            </Col>
          </Row>

        </Form>
      )}
    </Formik>
  );
};

export default ExchangeForm;