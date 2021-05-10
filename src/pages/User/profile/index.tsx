import {
  LockOutlined,
  MobileOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Alert, Tabs, } from 'antd';
import React, { useState } from 'react';
import ProForm, {ProFormText, ProFormTextArea} from '@ant-design/pro-form';
import {connect, useIntl, FormattedMessage} from 'umi';
import type { Dispatch } from 'umi';
import type { ConnectState } from '@/models/connect';

import styles from './index.less';
import {UserStateType} from "@/models/user";
import {UserParamType} from "@/services/user";

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

const Profile: React.FC<UserProfileProps> = (props) => {
  const { userProfile = {}, submitting } = props;
  const [actionTab, setActionTab] = useState<string>('editprofile');

  const intl = useIntl();

  const handleSubmit = (values: UserParamType) => {
    const { dispatch } = props;
    dispatch({
      type: 'user/saveProfileData',
      payload: { ...values, actionTab },
    });
  };
  return (
    <div className={styles.main}>
      <ProForm
        name="userProfile"
        initialValues={ userProfile }
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
          handleSubmit(values as UserParamType);
          return Promise.resolve();
        }}
      >
        <Tabs activeKey={actionTab} onChange={setActionTab}>
          <Tabs.TabPane
            key="editprofile"
            tab={intl.formatMessage({
              id: 'pages.profile.login.tab',
              defaultMessage: 'User Profile',
            })}
          />
        </Tabs>
          <>
            <ProFormText
              name="username"
              disabled={true}
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined className={styles.prefixIcon} />,
              }}
              placeholder={intl.formatMessage({
                id: 'pages.profile.username.placeholder',
                defaultMessage: 'User Name',
              })}
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage
                      id="pages.profile.username.required"
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
                id: 'pages.profile.password.placeholder',
                defaultMessage: 'Password',
              })}
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage
                      id="pages.profile.password.required"
                      defaultMessage="Please input your password!"
                    />
                  ),
                },
              ]}
            />

            <ProFormText
              name="firstName"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined className={styles.prefixIcon} />,
              }}
              placeholder={intl.formatMessage({
                id: 'pages.profile.firstname.placeholder',
                defaultMessage: 'First Name',
              })}
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage
                      id="pages.profile.firstname.required"
                      defaultMessage="Please input your first name!"
                    />
                  ),
                },
              ]}
            />
            <ProFormText
            name="lastName"
            fieldProps={{
              size: 'large',
              prefix: <UserOutlined className={styles.prefixIcon} />,
            }}
            placeholder={intl.formatMessage({
              id: 'pages.profile.lastname.placeholder',
              defaultMessage: 'Last Name',
            })}
            rules={[
              {
                required: true,
                message: (
                  <FormattedMessage
                    id="pages.profile.lastname.required"
                    defaultMessage="Please input your last name!"
                  />
                ),
              },
            ]}
          />
            <ProFormText
              name="contact"
              fieldProps={{
                size: 'large',
                prefix: <MobileOutlined className={styles.prefixIcon} />,
              }}
              placeholder={intl.formatMessage({
                id: 'pages.profile.contact.placeholder',
                defaultMessage: 'Contact Number',
              })}
              rules={[
                {
                  required: true,
                  pattern: /^[3,6,8,9]{1}[0-9]{7}$/,
                  message: (
                    <FormattedMessage
                      id="pages.profile.contact.required"
                      defaultMessage="Please input your contact!"
                    />
                  ),
                },
              ]}
            />
            <ProFormTextArea
            name="address"
            fieldProps={{
              size: 'large',
            }}
            placeholder={intl.formatMessage({
              id: 'pages.profile.contact.placeholder',
              defaultMessage: 'Address',
            })}
            rules={[
              {
                required: true,
                message: (
                  <FormattedMessage
                    id="pages.profile.contact.required"
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

export default connect(({ user, loading }: ConnectState) => ({
  userProfile: user.currentUser,
  submitting: loading.effects['user/fetchCurrent'],
}))(Profile);
