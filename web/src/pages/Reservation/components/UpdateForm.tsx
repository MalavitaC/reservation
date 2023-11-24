import { ModalForm, ProFormDateTimePicker, ProFormText } from '@ant-design/pro-components';
import { Form, Modal } from 'antd';
import React, { PropsWithChildren } from 'react';

export interface UpdateFormProps {
  updateModalVisible: boolean
  onCancel: () => void;
  onSubmit: (value: any)=>any
  values:any
}

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const { updateModalVisible, onCancel, values, onSubmit } = props;
  console.log(values)
  const [form] = Form.useForm<{ expected_arrival_time: Date }>();
  return (
    <ModalForm<{
      expected_arrival_time: Date;
    }>
      title="改期"
      form={form}
      autoFocusFirstInput
      modalProps={{
        destroyOnClose: true,
        onCancel: onCancel,
      }}
      submitTimeout={2000}
      onFinish={onSubmit}
      initialValues={values}
      open={updateModalVisible}
    >
      <ProFormDateTimePicker
            name="expected_arrival_time"
            label="日期时间"
            fieldProps={{
              format: (value) => value.format('YYYY-MM-DD HH:mm:ss'),
            }}
          />
      <ProFormText
        name="id"
        hidden={true}
      ></ProFormText>
    </ModalForm>
  );
};

export default UpdateForm;
