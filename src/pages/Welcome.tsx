import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import {Card, Alert, Image, Typography, Row, Col} from 'antd';
import { useIntl, FormattedMessage } from 'umi';
import styles from './Welcome.less';
import train from '../assets/train-hand.svg';
import fastFood from '../assets/fast-food.svg';
import school from '../assets/school.svg';
import ReactWordcloud, {Word} from 'react-wordcloud';
import { Input } from 'antd';

const { Search } = Input;

const searchFor = (searchTxt:string) => {
  window.location.href = `http://localhost:8080/list?category=${searchTxt}`;
}

const wordCloudCallback = {
  onWordClick: (word: Word) => searchFor(word.text),
}

const categoryList = [
  {
    text: 'accomodation',
    value: 10,
  },{
    text: 'hospital',
    value: 10,
  },{
    text: 'coffee',
    value: 10,
  },{
    text: 'assignment',
    value: 10,
  },
  {
    text: 'enrichment',
    value: 9,
  },
  {
    text: 'transport',
    value: 8,
  },
  {
    text: 'food',
    value: 8,
  },
  {
    text: 'studymama',
    value: 1,
  },
]

const CodePreview: React.FC = ({ children }) => (
  <pre className={styles.pre}>
    <code style={{alignContent: "center"}}>
      <h2><Typography.Text>{children}</Typography.Text></h2>
    </code>
  </pre>
);

export default (): React.ReactNode => {
  const intl = useIntl();
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
                  <Search name="searchText"
                          placeholder="input search text"
                          enterButton="Search"
                          size="large"
                          onSearch={(value, post) => searchFor(value)}
                        />
                </>
              </CodePreview>
            </Card>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Card bodyStyle={{alignContent: "center"}}>
              <CodePreview>
                <FormattedMessage id="pages.welcome.search.keywords" defaultMessage="Popular Searches" /><br/>
                <ReactWordcloud words={categoryList} callbacks={wordCloudCallback}/>
              </CodePreview>
            </Card>
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
                  onClick={() => searchFor('school')}
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
                  onClick={() => searchFor('transport')}
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
                  onClick={() => searchFor('food')}
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
