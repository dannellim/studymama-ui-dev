import {LogoutOutlined, ProfileOutlined, UserOutlined} from '@ant-design/icons';
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
    const { dispatch } = this.props;
    if (dispatch && key === 'logout') {
        dispatch({
          type: 'login/logout',
        });
    } else if (dispatch && key === 'editprofile') {
        dispatch({
          type: 'user/fetchCurrent',
        });
    }
    history.push(`/user/${key}`);
  };

  render(): React.ReactNode {
    const {
      currentUser = {
        id: '',
        username: '',
        firstName: '',
        lastName: '',
      },
      menu,
    } = this.props;
    const menuHeaderDropdown = (
      <Menu className={styles.menu} selectedKeys={['editprofile']} onClick={this.onMenuClick}>
        {menu && <Menu.Divider />}
        <Menu.Item key="editprofile">
          <ProfileOutlined />
          Edit Profile
        </Menu.Item>
        {menu && <Menu.Divider />}
        <Menu.Item key="logout">
          <LogoutOutlined />
          Logout
        </Menu.Item>
        {menu && <Menu.Divider />}
      </Menu>
    );
    return currentUser && currentUser.id ? (
      <HeaderDropdown overlay={menuHeaderDropdown}>
        <span className={`${styles.action} ${styles.account}`}>
            <UserOutlined/>&nbsp;{currentUser.firstName}, {currentUser.lastName}
            ({currentUser.username || currentUser.id})
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
