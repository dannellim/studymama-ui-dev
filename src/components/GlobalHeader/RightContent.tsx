import type { Settings as ProSettings } from '@ant-design/pro-layout';
import React from 'react';
import type { ConnectProps } from 'umi';
import { connect, SelectLang } from 'umi';
import Avatar from './AvatarDropdown';
import styles from './index.less';
import {ConnectState} from "@/models/connect";

export type GlobalHeaderRightProps = {
  theme?: ProSettings['navTheme'] | 'realDark';
} & Partial<ConnectProps> &
  Partial<ProSettings>;

const GlobalHeaderRight: React.SFC<GlobalHeaderRightProps> = () => {
  return (
    <>
          <Avatar />
          <SelectLang className={styles.action} />
    </>
    );
  };

export default connect(({ settings }: ConnectState) => ({
  theme: settings.navTheme,
  layout: settings.layout,
}))(GlobalHeaderRight);
