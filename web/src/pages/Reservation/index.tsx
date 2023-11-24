import {
  ActionType,
  PageContainer,
  ProColumns,
  ProTable,
} from '@ant-design/pro-components';
import { Button, Divider, message } from 'antd';
import React, { useRef, useState } from 'react';
import CreateForm from './components/CreateForm';
import UpdateForm from './components/UpdateForm';
import ReservationController from '@/services/reservation/ReservationController';

const { getList } = ReservationController

function ReservationList() {
  /**
   * 添加节点
   * @param fields
   */
  const handleAdd = async (fields: API.UserInfo) => {
    const hide = message.loading('正在添加');
    try {
      await ReservationController.createReservation({ ...fields });
      hide();
      message.success('添加成功');
      return true;
    } catch (error) {
      hide();
      message.error('添加失败请重试！');
      return false;
    }
  };
  
  /**
   * 更新节点
   * @param fields
   */
  const handleUpdate = async (params: any) => {
    const hide = message.loading('正在改期');
    try {
      console.log(params)
      await ReservationController.reschedule({id: params.id, expected_arrival_time:params.expected_arrival_time});
      hide();
  
      message.success('配置成功');
      return true;
    } catch (error) {
      hide();
      message.error('配置失败请重试！');
      return false;
    }
  };
  
  /**
   *  删除节点
   * @param selectedRows
   */
  const handleRemove = async (id: string) => {
    const hide = message.loading('正在删除');
    try {
      await ReservationController.deleteReservation({id});
      hide();
      message.success('删除成功，即将刷新');
      return true;
    } catch (error) {
      hide();
      message.error('删除失败，请重试');
      return false;
    }
  };

  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [stepFormValues, setStepFormValues] = useState({});
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<API.Reservation>[] = [
    {
      title: '预约人',
      dataIndex: 'guest_name',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '名称为必填项',
          },
        ],
      }
    },
    {
      title: '预约日期',
      dataIndex: 'expected_arrival_time',
      valueType: 'dateTime',
      search: false
    },
    {
      title: '桌型',
      dataIndex: 'table_size',
      valueType: 'digit',
      search: false
    },
    {
      title: '手机',
      dataIndex: ['gest_contact_info', 'phone'],
      valueType: 'text',
      // readonly: true
    },
    {
      title: '邮箱',
      dataIndex: ['gest_contact_info', 'mail'],
      valueType: 'text',
      search: false
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueType: 'text',
      search: false,
      readonly: true
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      readonly: true,
      render: (text, record) => (
        <>
        <a
          onClick={() => {
            handleUpdateModalVisible(true);
            setStepFormValues(record);
          }}
        >
          改期
        </a>
        <Divider type="vertical" />
        <a 
          onClick={() => {
            handleRemove(record.id);
          }}
        >删除</a>
        </>
      ),
    },
  ];

  return (
    <PageContainer
      header={{
        title: '预约记录',
      }}
    >
      <ProTable<API.Reservation>
        headerTitle=""
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            key="1"
            type="primary"
            onClick={() => handleModalVisible(true)}
          >
            新建
          </Button>,
        ]}
        request={async (params)=>{
          delete params.pageSize
          delete params.current
          const data = await getList(params)
          console.log(data)
          return {data: data.getList}
        }}
        columns={columns}
        // rowSelection={{
        //   onChange: (_, selectedRows) => setSelectedRows(selectedRows),
        // }}
      />
      {/* {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              已选择{' '}
              <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a>{' '}
              项&nbsp;&nbsp;
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
            批量删除
          </Button>
          <Button type="primary">批量审批</Button>
        </FooterToolbar>
      )} */}
      <CreateForm
        onCancel={() => handleModalVisible(false)}
        modalVisible={createModalVisible}
      >
        <ProTable<API.Reservation, API.Reservation>
          onSubmit={async (value) => {
            const success = await handleAdd(value);
            if (success) {
              handleModalVisible(false);
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          rowKey="id"
          type="form"
          columns={columns}
        />
      </CreateForm>
      {stepFormValues && Object.keys(stepFormValues).length ? (
        <UpdateForm
          onCancel={() => {
            handleUpdateModalVisible(false);
          }}
          updateModalVisible={updateModalVisible}
          values={stepFormValues}
          onSubmit={async (value) => {
            const success = await handleUpdate(value);
            if (success) {
              handleUpdateModalVisible(false);
              setStepFormValues({});
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
        />
      ) : null}

      {/* <Drawer
        width={600}
        open={!!row}
        onClose={() => {
          setRow(undefined);
        }}
        closable={false}
      >
        {row?.name && (
          <ProDescriptions<API.Reservation>
            column={2}
            title={row?.name}
            request={async () => ({
              data: row || {},
            })}
            params={{
              id: row?.name,
            }}
            columns={columns}
          />
        )}
      </Drawer> */}
    </PageContainer>
  );
};

export default ReservationList;
