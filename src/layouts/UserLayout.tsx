import type { MenuDataItem } from '@ant-design/pro-layout';
import { DefaultFooter, getMenuData, getPageTitle } from '@ant-design/pro-layout';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import type { ConnectProps } from 'umi';
import { Link, SelectLang, useIntl, connect, FormattedMessage } from 'umi';
import React from 'react';
import type { ConnectState } from '@/models/connect';
import logo from '../assets/logo.jpg';
import styles from './UserLayout.less';
import {GithubOutlined} from "@ant-design/icons";

export type UserLayoutProps = {
  breadcrumbNameMap: Record<string, MenuDataItem>;
} & Partial<ConnectProps>;

const UserLayout: React.FC<UserLayoutProps> = (props) => {
  const {
    route = {
      routes: [],
    },
  } = props;
  const { routes = [] } = route;
  const {
    children,
    location = {
      pathname: '',
    },
  } = props;
  const { formatMessage } = useIntl();
  const { breadcrumb } = getMenuData(routes);
  const title = getPageTitle({
    pathname: location.pathname,
    formatMessage,
    breadcrumb,
    ...props,
  });
  return (
    <HelmetProvider>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={title} />
      </Helmet>

      <div className={styles.container}>
        <div className={styles.lang}>
          <SelectLang />
        </div>
        <div className={styles.content}>
          <div className={styles.top}>
            <div className={styles.header}>
              <Link to="/welcome">
                <img alt="logo" className={styles.logo} src={logo} />
                <span className={styles.title}>StudyMama</span>
              </Link>
            </div>
            <div className={styles.desc}>
              <FormattedMessage
                id="pages.layouts.userLayout.title"
                defaultMessage="StudyMama UI"
              />
            </div>
          </div>
          {children}
        </div>
        <DefaultFooter
          copyright={`${new Date().getFullYear()} Produced by "Team 7 ( Dan, Prakash, Liye, Xinyi, Aung)"`}
          links={[
            {
              key: 'License',
              title: 'MIT License',
              href: 'https://raw.githubusercontent.com/prakashkaul/studymama-ui/main/LICENSE?token=AGURPTPM5JIOICFUVODR6BTAQLB3M',
              blankTarget: true,
            },
            {
              key: 'github',
              title: <GithubOutlined />,
              href: 'https://github.com/prakashkaul/studymama-ui.git',
              blankTarget: true,
            },
            {
              key: 'Team',
              title: 'Team 7',
              href: '#',
              blankTarget: true,
            },
          ]}
        />
      </div>
    </HelmetProvider>
  );
};

export default connect(({ settings }: ConnectState) => ({ ...settings }))(UserLayout);
