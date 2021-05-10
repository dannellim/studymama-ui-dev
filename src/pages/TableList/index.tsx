import {PlusOutlined, SmileOutlined} from '@ant-design/icons';
import { Button, message, Input, Drawer } from 'antd';
import React, { useState, useRef } from 'react';
import { useIntl, FormattedMessage } from 'umi';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { ModalForm, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import type { ProDescriptionsItemProps } from '@ant-design/pro-descriptions';
import ProDescriptions from '@ant-design/pro-descriptions';
import UpdateForm, {FormValueType} from './components/UpdateForm';
import {allPost, updatePost, addPost, deletePost} from './service';
import {Post} from "@/models/post";

const handleAdd = async (fields: Post) => {
  const hide = message.loading('Adding..');
  try {
    await addPost({ ...fields });
    hide();
    message.success('Post added successfully');
    return true;
  } catch (error) {
    hide();
    message.error('Failed to add post, please try again!');
    return false;
  }
};

const handleUpdate = async (post: Post, rating: number) => {
  const hide = message.loading('Updating');
  if (post && post.rating) {
    try {
      await updatePost(post);
      hide();
      message.success('Updation is successful.');
      return true;
    } catch (error) {
      hide();
      message.error('Updation failed, please try again!');
      return false;
    }
    return true;
  }
  return false;
};

const handleRemove = async (selectedRows: Post[]) => {
  const hide = message.loading('Deleting');
  if (!selectedRows) return true;
  selectedRows.map((row) => row.id).forEach((idx) => {
    try {
      deletePost({
        id: idx,
      });
      hide();
      message.success('Post deleted successfully');
      return true;
    } catch (error) {
      hide();
      message.error('Deletion failed, please try again');
      return false;
    }
  });
  return true;
};

async function handleUpdateForm(value: FormValueType) {
  const post : Post = {
    id: value.id,
    rating: value.rating,
  };
  return handleUpdate(post, 0);
}

const PostList: React.FC = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);

  const [showDetail, setShowDetail] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<Post>();
  const [selectedRowsState, setSelectedRows] = useState<Post[]>([]);

  const intl = useIntl();

  const columns: ProColumns<Post>[] = [
    {
      title: (
        <FormattedMessage
          id="pages.searchTable.updateForm.ruleName.nameLabel"
          defaultMessage="Post Title"
        />
      ),
      dataIndex: 'name',
      tip: 'Post Title is unique key',
      render: (dom, entity) => {
        return (
          <a
            onClick={() => {
              setCurrentRow(entity);
              setShowDetail(true);
            }}
          >
            {dom}
          </a>
        );
      },
    },
    {
      title: <FormattedMessage id="pages.searchTable.titleDesc" defaultMessage="Description" />,
      dataIndex: 'desc',
      valueType: 'textarea',
    },
    {
      title: <FormattedMessage id="pages.searchTable.titleCallNo" defaultMessage="Number of service calls" />,
      dataIndex: 'callNo',
      sorter: true,
      hideInForm: true,
      renderText: (val: string) =>
        `${val}${intl.formatMessage({
          id: 'pages.searchTable.tenThousand',
          defaultMessage: ' 万 ',
        })}`,
    },
    {
      title: <FormattedMessage id="pages.searchTable.titleStatus" defaultMessage="Status" />,
      dataIndex: 'status',
      hideInForm: true,
      valueEnum: {
        0: {
          text: (
            <FormattedMessage id="pages.searchTable.nameStatus.default" defaultMessage="Shutdown" />
          ),
          status: 'Default',
        },
        1: {
          text: (
            <FormattedMessage id="pages.searchTable.nameStatus.running" defaultMessage="Running" />
          ),
          status: 'Processing',
        },
        2: {
          text: (
            <FormattedMessage id="pages.searchTable.nameStatus.online" defaultMessage="Online" />
          ),
          status: 'Success',
        },
        3: {
          text: (
            <FormattedMessage id="pages.searchTable.nameStatus.abnormal" defaultMessage="Abnormal" />
          ),
          status: 'Error',
        },
      },
    },
    {
      title: (
        <FormattedMessage id="pages.searchTable.titleUpdatedAt" defaultMessage="Last Scheduled time" />
      ),
      sorter: true,
      dataIndex: 'updatedAt',
      valueType: 'dateTime',
      renderFormItem: (item, { defaultRender, ...rest }, form) => {
        const status = form.getFieldValue('status');
        if (`${status}` === '0') {
          return false;
        }
        if (`${status}` === '3') {
          return (
            <Input
              {...rest}
              placeholder={intl.formatMessage({
                id: 'pages.searchTable.exception',
                defaultMessage: 'Please enter the reason for the exception!',
              })}
            />
          );
        }
        return defaultRender(item);
      },
    },
    {
      title: <FormattedMessage id="pages.searchTable.titleOption" defaultMessage="Operating" />,
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="config"
          onClick={() => {
            handleUpdateModalVisible(true);
            setCurrentRow(record);
          }}
        >
          <FormattedMessage id="pages.searchTable.config" defaultMessage="Configuration" />
        </a>,
          <div>
            <a key="upVote" href="#"
               onSubmit={async (value) => {
                 const success = await handleUpdate(record, 1);
                 if (success) {
                   handleUpdateModalVisible(false);
                   setCurrentRow(undefined);
                   if (actionRef.current) {
                     actionRef.current.reload();
                   }
                 }
               }}>
              <SmileOutlined style={{fontSize: 16}}/>
            </a>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <a key="downVote" href="#"
               onSubmit={async (value) => {
                 const success = await handleUpdate(record, -1);
                 if (success) {
                   handleUpdateModalVisible(false);
                   setCurrentRow(undefined);
                   if (actionRef.current) {
                     actionRef.current.reload();
                   }
                 }
               }}>
              <SmileOutlined rotate={180} style={{fontSize: 16}}/>
            </a>
          </div>,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable<Post>
        headerTitle={intl.formatMessage({
          id: 'pages.searchTable.title',
          defaultMessage: 'Search Results',
        })}
        actionRef={actionRef}
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleModalVisible(true);
            }}
          >
            <PlusOutlined />
            <FormattedMessage id="pages.searchTable.new" defaultMessage="New" />
          </Button>,
        ]}
        request={(params, sorter, filter) => allPost({ ...params, sorter, filter })}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              <FormattedMessage id="pages.searchTable.chosen" defaultMessage="Chosen" />{' '}
              <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a>{' '}
              <FormattedMessage id="pages.searchTable.item" defaultMessage="Item" />
              &nbsp;&nbsp;
              <span>
                <FormattedMessage
                  id="pages.searchTable.totalServiceCalls"
                  defaultMessage="服务调用次数总计"
                />{' '}
                {selectedRowsState.reduce((pre, item) => pre + (item.id || 0), 0)}{' '}
                <FormattedMessage id="pages.searchTable.tenThousand" defaultMessage="Ten Thousand" />
              </span>
            </div>
          }
        >
        <Button
          onClick={async () => {
            await handleRemove(selectedRowsState);
            setSelectedRows([]);
            actionRef.current?.reloadAndRest?.();
          }}
        >
          <FormattedMessage id="pages.searchTable.batchDeletion" defaultMessage="Batch Deletion" />
        </Button>
        <Button type="primary">
          <FormattedMessage id="pages.searchTable.batchApproval" defaultMessage="Batch Approval" />
        </Button>
      </FooterToolbar>
      )}
      <ModalForm
        title={intl.formatMessage({
          id: 'pages.searchTable.createForm.newPost',
          defaultMessage: 'New Post',
        })}
        width="400px"
        visible={createModalVisible}
        onVisibleChange={handleModalVisible}
        onFinish={async (value) => {
          const success = await handleAdd(value as Post);
          if (success) {
            handleModalVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      >
        <ProFormText
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="pages.searchTable.ruleName"
                  defaultMessage="Rule name is required"
                />
              ),
            },
          ]}
          width="md"
          name="name"
        />
        <ProFormTextArea width="md" name="desc" />
      </ModalForm>
      <UpdateForm
        onSubmit={async (value) => {
          const success = await handleUpdateForm(value);
          if (success) {
            handleUpdateModalVisible(false);
            setCurrentRow(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleUpdateModalVisible(false);
          setCurrentRow(undefined);
        }}
        updateModalVisible={updateModalVisible}
        values={currentRow || {}}
      />
      <Drawer
        width={600}
        visible={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {currentRow?.title && (
          <ProDescriptions<Post>
            column={2}
            title={currentRow?.title}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.title,
            }}
            columns={columns as ProDescriptionsItemProps<Post>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default PostList;
