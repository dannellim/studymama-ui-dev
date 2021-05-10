import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Menu, Spin } from 'antd';
import React from 'react';
import type { ConnectProps } from 'umi';
import { history, connect } from 'umi';
import type { ConnectState } from '@/models/connect';
import type { UserProfile } from '@/models/user';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';

export type GlobalHeaderRightProps = {
  currentUser?: UserProfile;
  menu?: boolean;
} & Partial<ConnectProps>;

class AvatarDropdown extends React.Component<GlobalHeaderRightProps> {
  onMenuClick = (event: {
    key: React.Key;
    keyPath: React.Key[];
    item: React.ReactInstance;
    domEvent: React.MouseEvent<HTMLElement>;
  }) => {
    const { key } = event;

    if (key === 'logout') {
      const { dispatch } = this.props;
      if (dispatch) {
        dispatch({
          type: 'login/logout',
        });
      }

      return;
    }
    history.push(`/account/${key}`);
  };

  render(): React.ReactNode {
    const {
      currentUser = {
        id: '',
        firstname: '',
        lastname: '',
      },
      menu,
    } = this.props;
    const menuHeaderDropdown = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={this.onMenuClick}>
        {menu && (
          <Menu.Item key="center">
            <UserOutlined />
            Personal Center
          </Menu.Item>
        )}
        {menu && (
          <Menu.Item key="settings">
            <SettingOutlined />
            Settings
          </Menu.Item>
        )}
        {menu && <Menu.Divider />}

        <Menu.Item key="logout">
          <LogoutOutlined />
          Logout
        </Menu.Item>
      </Menu>
    );
    return currentUser && currentUser.id ? (
      <HeaderDropdown overlay={menuHeaderDropdown}>
        <span className={`${styles.action} ${styles.account}`}>
          <span className={`${styles.name} anticon`}>{currentUser.firstname}</span>
          <span className={`${styles.name} anticon`}>{currentUser.lastname}</span>
        </span>
        <span className={`${styles.action} ${styles.account}`}>
          <span className={`${styles.name} anticon`}>({currentUser.id})</span>
        </span>
      </HeaderDropdown>
    ) : (
      <span className={`${styles.action} ${styles.account}`}>
        <Spin
          size="small"
          style={{
            marginLeft: 8,
            marginRight: 8,
          }}
        />
      </span>
    );
  }
}

export default connect(({ user }: ConnectState) => ({
  currentUser: user.currentUser,
}))(AvatarDropdown);
