import React, {useState} from 'react';
import {PageContainer} from '@ant-design/pro-layout';
import {Card, Alert, Image, Typography, Row, Col, message, AutoComplete} from 'antd';
import {useIntl, FormattedMessage} from 'umi';
import {connect} from 'umi';
import type { Dispatch } from 'umi';
import styles from './Welcome.less';
import train from '../assets/train-hand.svg';
import fastFood from '../assets/fast-food.svg';
import school from '../assets/school.svg';
import ReactWordcloud, {Word} from 'react-wordcloud';
import { Input } from 'antd';
import type { PostParamsType } from '@/services/post';
import {getCategoryListSvc} from "@/services/post";
import type {ConnectState} from "@/models/connect";
import type {UserModelState} from "@/models/connect";
import {getContentAppUrl, random} from "@/utils/utils";
import {searchPostByKeywordInTitleDescCategory} from "@/pages/TableList/service";
import Iframe from "react-iframe";
import {getRedirect2Content} from "@/utils/authority";

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
  welcomeUser? : UserModelState;
  postParameters? : PostParamsType;
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
        <ReactWordcloud words={categories || []}
                        callbacks={{onWordClick: onWordClickAction}}
                        options={{enableTooltip: false,
                                  padding: 12,
                                  fontSizes: [30, 30],
                                  rotationAngles: [360, 360]}}/>
      </CodePreview>
    </Card>
);

const Welcome: React.FC<SearchProps> = (props) => {
  const { postParameters, submitting } = props;
  const { suggestions, key, keyword, category, categoryList = getCategoryList(), currentPage = 1, pageSize = 10 } = postParameters;
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
        value: random(2,8),
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

  const searchForSuggestions = (values: PostParamsType) => {
    searchPostByKeywordInTitleDescCategory(values).then((res) => {
      console.log(res.data);
      props.postParameters = {suggestions : res.data};
    }).catch((err) => {
      console.log(err);
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
  const contentUrl = getContentAppUrl();
  const gotoContentSite = getRedirect2Content();
  return (
      (contentUrl && gotoContentSite && <div className="smContainer">
                        <Iframe className="smContainerFrame"
                                url={contentUrl}
                                height="800px" width="100%" scrolling="no"
                                id="smSurrogate"
                                position="relative"/>
                      </div>)
      ||
      (
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
            <Col span={12}>
              <Card bodyStyle={{alignContent: "center"}} >
                <CodePreview>
                  <FormattedMessage id="pages.welcome.search.category" defaultMessage="Enter Search Category" /><br/>
                  <>
                    <br />
                    <AutoComplete
                      dropdownClassName="certain-category-search-dropdown"
                      dropdownMatchSelectWidth={500}
                      style={{ width: 250 }}
                      options={suggestions}
                    >
                      <Search name="keyword"
                              placeholder="input search text"
                              enterButton="Search"
                              size="large"
                              value={keyword}
                              onChange={(evt) => {
                                searchForSuggestions({keyword: evt.target.value, currentPage: 1, pageSize: 5})
                              }}
                              onSearch={(value) => {searchForKeyword({keyword: value})}}
                      />
                    </AutoComplete>
                  </>
                </CodePreview>
              </Card>
            </Col>
            <Col span={12}>
              <SearchCategoryCard category={category} categories={categoryList} onWordClickAction = {searchForCategory}/>
            </Col>
          </Row>
          {/*<Row gutter={16}>*/}
          {/*  <Col span={24}>*/}
          {/*    <SearchCategoryCard category={category} categories={categoryList || []} onWordClickAction = {searchForCategory}/>*/}
          {/*  </Col>*/}
          {/*</Row>*/}
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
      )
  );
};

export default connect(({  postParam, loading }: ConnectState) => ({
  submitting: (loading.effects['post/searchByCategory'] || loading.effects['post/searchByKeyword'] || loading.effects['post/category']),
  postParameters: postParam || {},
}))(Welcome);
