import React from 'react';
import { Modal } from 'antd';
import {
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  StepsForm,
  ProFormRadio,
  ProFormDateTimePicker,
} from '@ant-design/pro-form';
import { useIntl, FormattedMessage } from 'umi';

import type { Post } from '../data.d';

export type FormValueType = {
  target?: string;
  template?: string;
  type?: string;
  time?: string;
  frequency?: string;
} & Partial<Post>;

export type UpdateFormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => Promise<void>;
  updateModalVisible: boolean;
  values: Partial<Post>;
};

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const intl = useIntl();
  return (
    <StepsForm
      stepsProps={{
        size: 'small',
      }}
      stepsFormRender={(dom, submitter) => {
        return (
          <Modal
            width={640}
            bodyStyle={{ padding: '32px 40px 48px' }}
            destroyOnClose
            title={intl.formatMessage({
              id: 'pages.searchTable.updateForm.ruleConfig',
              defaultMessage: 'Rule Configuration',
            })}
            visible={props.updateModalVisible}
            footer={submitter}
            onCancel={() => {
              props.onCancel();
            }}
          >
            {dom}
          </Modal>
        );
      }}
      onFinish={props.onSubmit}
    >
      <StepsForm.StepForm
        initialValues={{
          title: props.values.title,
          description: props.values.description,
          price: props.values.price,
          id: props.values.id,
        }}
        title={intl.formatMessage({
          id: 'pages.searchTable.updateForm.basicConfig',
          defaultMessage: 'Basic Information',
        })}
      >
        <ProFormText
          name="id"
          label={intl.formatMessage({
            id: 'pages.searchTable.updateForm.postId',
            defaultMessage: 'Post Id',
          })}
          width="md"
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="pages.searchTable.updateForm.postId.idRules"
                  defaultMessage="Please enter the post id!"
                />
              ),
            },
          ]}
        />
        <ProFormText
        name="title"
        label={intl.formatMessage({
          id: 'pages.searchTable.updateForm.postTitle.titleLabel',
          defaultMessage: 'Title',
        })}
        width="md"
        rules={[
          {
            required: true,
            message: (
              <FormattedMessage
                id="pages.searchTable.updateForm.postTitle.idRules"
                defaultMessage="Please enter the title!"
              />
            ),
          },
        ]}
      />
        <ProFormTextArea
          name="description"
          width="md"
          label={intl.formatMessage({
            id: 'pages.searchTable.updateForm.postDescription.descLabel',
            defaultMessage: 'Post Description',
          })}
          placeholder={intl.formatMessage({
            id: 'pages.searchTable.updateForm.postDescription.descPlaceholder',
            defaultMessage: 'Please enter at least five characters',
          })}
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="pages.searchTable.updateForm.ruleDesc.descRules"
                  defaultMessage="Please enter a rule description of at least five characters!"
                />
              ),
              min: 5,
            },
          ]}
        />
      </StepsForm.StepForm>
      <StepsForm.StepForm
        initialValues={{
          target: '0',
          template: '0',
        }}
        title={intl.formatMessage({
          id: 'pages.searchTable.updateForm.ruleProps.title',
          defaultMessage: 'Configure rule properties',
        })}
      >
        <ProFormSelect
          name="target"
          width="md"
          label={intl.formatMessage({
            id: 'pages.searchTable.updateForm.object',
            defaultMessage: 'Monitoring Object',
          })}
          valueEnum={{
            0: 'Table I',
            1: 'Table II',
          }}
        />
        <ProFormSelect
          name="template"
          width="md"
          label={intl.formatMessage({
            id: 'pages.searchTable.updateForm.ruleProps.templateLabel',
            defaultMessage: 'Rule Template',
          })}
          valueEnum={{
            0: 'Rule Template One',
            1: 'Rule Template Two',
          }}
        />
        <ProFormRadio.Group
          name="type"
          label={intl.formatMessage({
            id: 'pages.searchTable.updateForm.ruleProps.typeLabel',
            defaultMessage: 'Rule Type',
          })}
          options={[
            {
              value: '0',
              label: 'Strong',
            },
            {
              value: '1',
              label: 'Weak',
            },
          ]}
        />
      </StepsForm.StepForm>
      <StepsForm.StepForm
        initialValues={{
          type: '1',
          frequency: 'month',
        }}
        title={intl.formatMessage({
          id: 'pages.searchTable.updateForm.schedulingPeriod.title',
          defaultMessage: 'Set scheduling period',
        })}
      >
        <ProFormDateTimePicker
          name="time"
          width="md"
          label={intl.formatMessage({
            id: 'pages.searchTable.updateForm.schedulingPeriod.timeLabel',
            defaultMessage: 'Starting time',
          })}
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="pages.searchTable.updateForm.schedulingPeriod.timeRules"
                  defaultMessage="Please choose a start time！"
                />
              ),
            },
          ]}
        />
        <ProFormSelect
          name="frequency"
          label={intl.formatMessage({
            id: 'pages.searchTable.updateForm.object',
            defaultMessage: 'Monitoring Object',
          })}
          width="md"
          valueEnum={{
            month: 'month',
            week: 'week',
          }}
        />
      </StepsForm.StepForm>
    </StepsForm>
  );
};

export default UpdateForm;
