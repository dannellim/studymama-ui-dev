import {
  AppleFilled,
  GoogleCircleFilled,
  LockOutlined,
  MailOutlined,
  FacebookFilled,
  UserOutlined,
} from '@ant-design/icons';
import { Alert, Space, Tabs, Row, Col } from 'antd';
import React, { useState } from 'react';
import ProForm, { ProFormCheckbox, ProFormText } from '@ant-design/pro-form';
import {connect, useIntl, FormattedMessage} from 'umi';
import type { Dispatch } from 'umi';
import type { StateType } from '@/models/login';
import type { LoginParamsType } from '@/services/login';
import type { RegisterParamsType } from '@/services/register';
import type { ConnectState } from '@/models/connect';

import styles from './index.less';
import {getContentAppUrl} from "@/utils/utils";

export type LoginProps = {
  dispatch: Dispatch;
  userLogin: StateType;
  submitting?: boolean;
};

const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

const Login: React.FC<LoginProps> = (props) => {
  const { userLogin = {}, submitting } = props;
  const { status, type: loginType } = userLogin;
  const [actionTab, setActionTab] = useState<string>('login');

  const intl = useIntl();

  const handleSubmit = (values: LoginParamsType) => {
    const { dispatch } = props;
    dispatch({
      type: 'login/login',
      payload: { ...values, actionTab },
    });
  };
  const handleRegister = (values: RegisterParamsType) => {
    const { dispatch } = props;
    const role = 'ROLE_USER';
    dispatch({
      type: 'register/register',
      payload: { ...values, role },
    });
  };
  return (
    <div className={styles.main}>
      <ProForm
        name="userForm"
        initialValues={{
          autoLogin: true,
        }}
        submitter={{
          render: (_, dom) => dom.pop(),
          submitButtonProps: {
            loading: submitting,
            size: 'large',
            style: {
              width: '100%',
            },
          },
        }}
        onFinish={(values) => {
          if (actionTab === 'register') {
            handleRegister(values as RegisterParamsType);
          } else {
            handleSubmit(values as LoginParamsType);
          }
          return Promise.resolve();
        }}
      >
        <Tabs activeKey={actionTab} onChange={setActionTab} onTabClick={() => userForm.reset()}>
          <Tabs.TabPane
            key="login"
            tab={intl.formatMessage({
              id: 'pages.login.login.tab',
              defaultMessage: 'Login',
            })}
          />
          <Tabs.TabPane
            key="register"
            tab={intl.formatMessage({
              id: 'pages.login.register.tab',
              defaultMessage: 'Register',
            })}
          />
        </Tabs>

        {status === 'error' && loginType === 'login' && !submitting && (
          <LoginMessage
            content={intl.formatMessage({
              id: 'pages.login.login.errorMessage',
              defaultMessage: 'Incorrect username/password',
            })}
          />
        )}
        {actionTab === 'login' && (
          <>
            <ProFormText
              name="username"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined className={styles.prefixIcon} />,
              }}
              placeholder={intl.formatMessage({
                id: 'pages.login.username.placeholder',
                defaultMessage: 'User Name',
              })}
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage
                      id="pages.login.username.required"
                      defaultMessage="Please input your username!"
                    />
                  ),
                },
              ]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined className={styles.prefixIcon} />,
              }}
              placeholder={intl.formatMessage({
                id: 'pages.login.password.placeholder',
                defaultMessage: 'Password',
              })}
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage
                      id="pages.login.password.required"
                      defaultMessage="Please input your password!"
                    />
                  ),
                },
              ]}
            />
          </>
        )}

        {status === 'error' && loginType === 'register' && !submitting && (
          <LoginMessage content="Verification code error" />
        )}
        {actionTab === 'register' && (
          <>
            <ProFormText
              fieldProps={{
                size: 'large',
                prefix: <MailOutlined className={styles.prefixIcon} />,
              }}
              name="username"
              placeholder={intl.formatMessage({
                id: 'pages.register.username.placeholder',
                defaultMessage: 'Username',
              })}
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage
                      id="pages.register.username.required"
                      defaultMessage="Please input your user name!"
                    />
                  ),
                },
                {
                  pattern: /^\S+@\S+\.\S+$/,
                  message: (
                    <FormattedMessage
                      id="pages.register.username.invalid"
                      defaultMessage="User name should be valid email!"
                    />
                  ),
                },
              ]}
            />
            <ProFormText.Password
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined className={styles.prefixIcon} />,
              }}
              name="password"
              placeholder={intl.formatMessage({
                id: 'pages.register.password.placeholder',
                defaultMessage: 'Password',
              })}
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage
                      id="pages.register.password.required"
                      defaultMessage="Please input a password!"
                    />
                  ),
                },
                {
                  pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                  message: (
                    <FormattedMessage
                      id="pages.register.password.invalid"
                      defaultMessage="Password should be min 8 characters with atleast one uppercase, one lower case and one numeric character!"
                    />
                  ),
                },
              ]}
            />
          </>
        )}
        {actionTab === 'login' && (
          <div
            style={{
              marginBottom: 24,
            }}
          >
            <Row >
              <Col span={16}>
                <ProFormCheckbox noStyle name="autoLogin">
                  <FormattedMessage id="pages.login.rememberMe" defaultMessage="Remember me" />
                </ProFormCheckbox>
              </Col>
              <Col span={16}>
                { getContentAppUrl() !== undefined &&
                <ProFormCheckbox noStyle name="gotoContentSite">
                  <FormattedMessage id="pages.login.gotoContentSite" defaultMessage="Go to Content Site" />
                </ProFormCheckbox>}
              </Col>
            </Row>
          </div>
        )}
      </ProForm>
      <Row justify="center">
        <Col span={8}>&nbsp;</Col>
        <Col span={8}>&nbsp;</Col>
        <Col span={8}>&nbsp;</Col>
      </Row>
      <Row justify="center">
        <Col span={8}>&nbsp;</Col>
        <Col span={8}>
          <Space>
            <GoogleCircleFilled className={styles.icon} />
            <FacebookFilled className={styles.icon} />
            <AppleFilled className={styles.icon} />
          </Space>
        </Col>
        <Col span={8}>&nbsp;</Col>
      </Row>
    </div>
  );
};

export default connect(({ login, loading }: ConnectState) => ({
  userLogin: login,
  submitting: loading.effects['login/login'],
}))(Login);
