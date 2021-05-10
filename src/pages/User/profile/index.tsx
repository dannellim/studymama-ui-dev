import {
  LockOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Alert, Tabs, } from 'antd';
import React, { useState } from 'react';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import {connect, useIntl, FormattedMessage} from 'umi';
import type { Dispatch } from 'umi';
import type { LoginParamsType } from '@/services/login';
import type { ConnectState } from '@/models/connect';

import styles from './index.less';
import {UserStateType} from "@/models/user";

export type UserProfileProps = {
  dispatch: Dispatch;
  userProfile?: UserStateType;
  submitting?: boolean;
};

const UserMessage: React.FC<{
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

const Login: React.FC<UserProfileProps> = (props) => {
  const { userProfile = {}, submitting } = props;
  const [actionTab, setActionTab] = useState<string>('update');

  const intl = useIntl();

  const handleSubmit = (values: LoginParamsType) => {
    const { dispatch } = props;
    dispatch({
      type: 'user/save',
      payload: { ...values, actionTab },
    });
  };
  return (
    <div className={styles.main}>
      <ProForm
        name="userProfile"
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
          handleSubmit(values as LoginParamType);
          return Promise.resolve();
        }}
      >
        <Tabs activeKey={actionTab} onChange={setActionTab}>
          <Tabs.TabPane
            key="login"
            tab={intl.formatMessage({
              id: 'pages.login.login.tab',
              defaultMessage: 'Update Profile',
            })}
          />
        </Tabs>
        {status === 'error' && !submitting && (
          <UserMessage
            content={intl.formatMessage({
              id: 'pages.login.login.errorMessage',
              defaultMessage: 'Incorrect username/password',
            })}
          />
        )}
          <>
            <ProFormText
              name="userProfile.username"
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
              name="userProfile.password"
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

            <ProFormText
              name="userProfile.firstname"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined className={styles.prefixIcon} />,
              }}
              placeholder={intl.formatMessage({
                id: 'pages.login.firstname.placeholder',
                defaultMessage: 'First Name',
              })}
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage
                      id="pages.login.firstname.required"
                      defaultMessage="Please input your first name!"
                    />
                  ),
                },
              ]}
            />
            <ProFormText
            name="userProfile.lastname"
            fieldProps={{
              size: 'large',
              prefix: <UserOutlined className={styles.prefixIcon} />,
            }}
            placeholder={intl.formatMessage({
              id: 'pages.login.lastname.placeholder',
              defaultMessage: 'Last Name',
            })}
            rules={[
              {
                required: true,
                message: (
                  <FormattedMessage
                    id="pages.login.lastname.required"
                    defaultMessage="Please input your last name!"
                  />
                ),
              },
            ]}
          />
            <ProFormText
              name="userProfile.contact"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined className={styles.prefixIcon} />,
              }}
              placeholder={intl.formatMessage({
                id: 'pages.login.contact.placeholder',
                defaultMessage: 'Contact Number',
              })}
              rules={[
                {
                  required: true,
                  pattern: /^[3,6,8,9]{1}[0-9]{7}$/,
                  message: (
                    <FormattedMessage
                      id="pages.login.contact.required"
                      defaultMessage="Please input your contact!"
                    />
                  ),
                },
              ]}
            />
            <ProFormText
            name="userProfile.address"
            fieldProps={{
              size: 'large',
              prefix: <UserOutlined className={styles.prefixIcon} />,
            }}
            placeholder={intl.formatMessage({
              id: 'pages.login.contact.placeholder',
              defaultMessage: 'Address',
            })}
            rules={[
              {
                required: true,
                message: (
                  <FormattedMessage
                    id="pages.login.contact.required"
                    defaultMessage="Please input your address!"
                  />
                ),
              },
            ]}
          />
          </>
      </ProForm>
    </div>
  );
};

export default connect(({ login, loading }: ConnectState) => ({
  userLogin: login,
  submitting: loading.effects['login/login'],
}))(Login);
