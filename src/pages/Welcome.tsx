import React, {useState} from 'react';
import {PageContainer} from '@ant-design/pro-layout';
import {Card, Alert, Image, Typography, Row, Col, message} from 'antd';
import {useIntl, connect, FormattedMessage} from 'umi';
import styles from './Welcome.less';
import train from '../assets/train-hand.svg';
import fastFood from '../assets/fast-food.svg';
import school from '../assets/school.svg';
import ReactWordcloud, {Word} from 'react-wordcloud';
import { Input } from 'antd';
import type { PostParamsType } from '@/services/post';
import type { ConnectState } from '@/models/connect';
import type { Dispatch } from 'umi';
import {getCategoryListSvc} from "@/services/post";

const { Search } = Input;

const CodePreview: React.FC = ({ children }) => (
  <pre className={styles.pre}>
    <code style={{alignContent: "center"}}>
      <h2><Typography.Text>{children}</Typography.Text></h2>
    </code>
  </pre>
);

export type SearchProps = {
  dispatch: Dispatch;
  welcomeUser : PostParamsType;
  submitting?: boolean;
};

const SearchCategoryCard: React.FC<{
  category?: string,
  categories: Word[],
  onWordClickAction: any,
}> = ({category,categories,onWordClickAction,}) => (
    <Card bodyStyle={{alignContent: "center"}}>
      <CodePreview>
        <FormattedMessage id="pages.welcome.search.keywords" defaultMessage="Popular Searches" /><br/>
        <ReactWordcloud words={categories || []} callbacks={{onWordClick: onWordClickAction}} />
      </CodePreview>
    </Card>
);

const WelcomePage: React.FC<SearchProps> = (props) => {
  const { welcomeUser = {}, submitting } = props;
  const { keyword, category, categoryList = getCategoryList() } = welcomeUser;
  const {} = useState({});
  const intl = useIntl();
  console.log(submitting);

  function getCategoryList() {
    const categoryList: string[] = getCategoryListSvc();
    const wordList: Word[] = [];

    categoryList.forEach((value) => {
      wordList.push({
        key: value,
        text: value,
        value: 10,
      });
    });
    return wordList;
  }

  const searchForKeyword = (values: PostParamsType) => {
    message.success(`searching posts for : ${values.keyword}`);
    const { dispatch } = props;
    dispatch({
      type: 'post/searchByKeywords',
      payload: { keyword: values.keyword },
    });
  }

  const searchForCategory = (value: PostParamsType) => {
      console.log(value.category || value.key);
      message.success(`searching posts for : ${value.category || value.key}`);
      const { dispatch } = props;
      dispatch({
        type: 'post/searchByCategory',
        payload: {
          category: value.category || value.key,
          currentPage: 1,
          pageSize: 1,
        },
      });
    }

  return (
    <PageContainer>
      <Card bodyStyle={{alignItems: "center"}}>
        <Alert
          message={intl.formatMessage({
            id: 'pages.welcome.alertMessage',
            defaultMessage: 'Welcome to StudyMama! Your one stop shop for faster and more relevant search results for your learning needs.',
          })}
          type="success"
          showIcon
          banner
          style={{
            margin: -12,
            marginBottom: 24,
          }}
        />
      </Card>
      <div>
        <Row gutter={16}>
          <Col span={24}>
            <Card bodyStyle={{alignContent: "center"}}>
              <CodePreview>
                <FormattedMessage id="pages.welcome.search.category" defaultMessage="Enter Search Category" /><br/>
                <>
                  <br />
                  <Search name="keyword"
                          placeholder="input search text"
                          enterButton="Search"
                          size="large"
                          value={keyword}
                          onSearch={(value) => {searchForKeyword({keyword: value})}}
                        />
                </>
              </CodePreview>
            </Card>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <SearchCategoryCard category={category} categories={categoryList || []} onWordClickAction = {searchForCategory}/>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={8}>
            <Card bodyStyle={{alignContent: "center"}}>
              <CodePreview>
                <FormattedMessage id="pages.welcome.search.school" defaultMessage="Schools & Tuition Centers" /><br/>
                <a
                  href="#"
                  rel="noopener noreferrer"
                  target="_self"
                  onClick={() => searchForCategory({category: 'school'})}
                >
                  <Image width={300} src={school} preview={false} />
                </a>
              </CodePreview>
            </Card>
          </Col>
          <Col span={8}>
            <Card bodyStyle={{alignContent: "center"}}>
              <CodePreview>
                <FormattedMessage id="pages.welcome.search.transport" defaultMessage="Buses & Trains" /><br/>
                <a
                  href="#"
                  rel="noopener noreferrer"
                  target="_self"
                  onClick={() => searchForCategory({category: 'transport'})}
                >
                  <Image width={300} src={train} preview={false}/>
                </a>
              </CodePreview>
            </Card>
          </Col>
          <Col span={8}>
            <Card bodyStyle={{alignContent: "center"}}>
              <CodePreview>
              <FormattedMessage id="pages.welcome.search.food" defaultMessage="Food Courts & Restaurants" /><br/>
                <a
                  href="#"
                  rel="noopener noreferrer"
                  target="_self"
                  onClick={() => searchForCategory({category: 'food'})}
                >
                  <Image width={300} src={fastFood} preview={false}/>
                </a>
              </CodePreview>
            </Card>
          </Col>
        </Row>
      </div>
    </PageContainer>
  );
};

export default connect(({ keyword, category, post, currentPage, pageSize, loading }: ConnectState) =>
  ({
    submitting: loading.effects['post/searchByCategory'] || loading.effects['post/searchByKeyword'] || loading.effects['post/category'],
    welcomeUser: {
         keyword: keyword,
         category: category,
         currentPage: currentPage,
         pageSize: pageSize,
         post: post,
    }
  })
)(WelcomePage);

