import { Table, Button, Input, Space, notification, Alert } from 'antd';
import 'antd/dist/antd.css';
import React from 'react';
import reqwest from 'reqwest';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';

const getRandomuserParams = params => {
  return {
    results: params.pagination.pageSize,
    page: params.pagination.current,
    ...params,
  };
};

const showHeader = true;

class CardTableCustomers2 extends React.Component {
  state = {
    searchText: '',
    searchedColumn: '',
    bordered: true,
    ellipsis: true,
    loading: false,
    size: 'small',
    expandable: {
      expandedRowRender: record => (
        <div className="px-2 py-2">
          {/* <p>accepts_marketing: false addresses: {JSON.stringify(record.addresses)}</p>

          <p>default_address: {JSON.stringify(record.default_address)}</p> */}

          <p>email: {record.email}</p>
          <p>first_name: {record.first_name}</p>
          <p>last_name: {record.last_name}</p>
          <p>address1: {record.default_address.address1}</p>
          <p>id: {record.id}</p>
          <p>last_order_id: {record.last_order_id}</p>
          <p>last_order_name: {record.last_order_name}</p>
          <p>modified_on: {record.modified_on}</p>
          <p>note: {record.note}</p>
          <p>orders_count: {record.orders_count}</p>
          <p>phone: {record.phone}</p>
          <p>sapo_id: {record.sapo_id}</p>
          <p>state: {record.state}</p>
          <p>tags: {record.tags}</p>
          <p>total_spent: {record.total_spent}</p>
          <p>verified_email: {record.verified_email}</p>
          <p>created_on: {record.created_on}</p>
        </div>
      ),
      rowExpandable: record => record.email !== 'Not Expandable',
    },
    // title: () => 'Here is title',
    showHeader,
    footer: undefined,
    rowSelection: undefined,
    scroll: undefined,
    hasData: true,
    tableLayout: undefined,
    top: 'none',
    bottom: 'bottomRight',
    data: [],
    pagination: {
      current: 1,
      pageSize: 20,
      position: 'bottom',
    },
    // xScroll: 'scroll',
  };

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}>
            Search
          </Button>
          <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) => {
      console.log(value, record);
      let searchS = record[dataIndex];
      if (dataIndex == 'name') {
        searchS = `${record.first_name}${record.last_name != null ? ' ' + record.last_name : ''}`;
      }

      if (searchS)
        return searchS
          .toString()
          .toLowerCase()
          .includes(value.toLowerCase());

      return '';
    },
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
    render: text => {
      console.log(text);
      if (dataIndex == 'name' && text) text = `${text.first_name}${text.last_name != null ? ' ' + text.last_name : ''}`;
      if (this.state.searchedColumn === dataIndex)
        return (
          <Highlighter
            highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
            searchWords={[this.state.searchText]}
            autoEscape
            textToHighlight={text ? text.toString() : ''}
          />
        );
      return text;
    },
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  componentDidMount() {
    const { pagination } = this.state;
    this.fetch({
      pagination,
    });
  }

  handleTableChange = (pagination, filters, sorter, extra) => {
    // console.log('params', pagination, filters, sorter, extra);
    this.fetch({
      sortField: sorter.field,
      sortOrder: sorter.order,
      sorter: sorter.length == undefined ? [sorter] : sorter,
      pagination,
      ...filters,
    });
  };
  fetch = (params = {}) => {
    this.setState({
      loading: true,
    });
    reqwest({
      url: '/v1/customers',
      method: 'get',
      type: 'json',
      data: getRandomuserParams(params),
    }).then(data => {
      //   console.log(data);
      this.setState({
        loading: false,
        data: data.data,
        pagination: {
          ...params.pagination,
          total: 20, // 200 is mock data, you should read it from server
          // total: data.totalCount,
        },
      });
    });
  };

  render() {
    const columns = [
      {
        title: 'Name',
        key: 'name',
        sortDirections: ['descend'],
        render: record => `${record.first_name}${record.last_name != null ? ' ' + record.last_name : ''}`,
        sorter: {
          compare: (a, b) => (a && b ? a.first_name.length - b.first_name.length : null),
          multiple: 1,
        },
        // ...this.getColumnSearchProps('name'),
      },
      {
        title: 'Phone',
        dataIndex: 'phone',
        key: 'phone',
        sortDirections: ['descend'],
        sorter: {
          //   compare: (a, b) => a.length - b.length,
          multiple: 2,
        },
        // ...this.getColumnSearchProps('phone'),
      },
      {
        title: 'Email',
        key: 'email',
        dataIndex: 'email',
        sorter: {
          //   compare: (a, b) => a.email.length - b.email.length,
          multiple: 4,
        },
        // ...this.getColumnSearchProps('email'),
      },
      {
        title: 'Birthday',
        key: 'birthday',
        dataIndex: 'birthday',
        render: record => `${record ? new Date(record).toLocaleDateString('vi-VN') : ''}`,
        sorter: {
          compare: (a, b) => new Date(a) - new Date(b),
          multiple: 3,
        },
        // ...this.getColumnSearchProps('birthday'),
      },
      {
        title: 'Gender',
        dataIndex: 'gender',
        key: 'gender',
        filters: [
          {
            text: 'Male',
            value: 'male',
          },
          {
            text: 'Female',
            value: 'female',
          },
        ],
      },
      {
        title: 'Total Spent',
        key: 'total_spent',
        dataIndex: 'total_spent',
        sorter: {
          compare: (a, b) => a - b,
          multiple: 5,
        },
      },
      //   {
      //     title: 'Orders Count',
      //     key: 'orders_count',
      //     dataIndex: 'orders_count',
      //     sorter: {
      //       multiple: 6,
      //     },
      //   },
      //   {
      //     title: 'Note',
      //     key: 'note',
      //     dataIndex: 'note',
      //     sorter: {
      //       multiple: 7,
      //     },
      //   },
      //   {
      //     title: 'Created On',
      //     key: 'created_on',
      //     render: record => `${record.created_on ? new Date(record.created_on).toLocaleDateString('vi-VN') : ''}`,
      //     sorter: {
      //       multiple: 8,
      //     },
      //   },
    ];

    const { xScroll, yScroll, ...state } = this.state;
    const scroll = {};

    if (yScroll) {
      scroll.y = 240;
    }

    if (xScroll) {
      scroll.x = '100vw';
    }

    const tableColumns = columns.map(item => ({ ...item, ellipsis: state.ellipsis }));

    if (xScroll === 'fixed') {
      tableColumns[0].fixed = true;
      tableColumns[tableColumns.length - 1].fixed = 'right';
    }

    const { data, loading, pagination } = this.state;

    return (
      <div className="bg-white rounded px-3 py-2">
        <div className="mb-2 flex flex-row-reverse">
          <Button
            // type="primary"
            onClick={() => {
              this.fetch({
                pagination,
              });
              notification['success']({
                message: 'Success',
                description: '',
                duration: 1,
                // placement: 'bottomRight',
              });
            }}
            loading={loading}>
            Reload
          </Button>
        </div>
        <div className="mb-2 flex">
          <Input
            ref={node => {
              this.searchInput = node;
            }}
            placeholder={`Search Name`}
            onChange={e => {}}
            onPressEnter={() => {}}
            style={{ width: 200, marginBottom: 8, display: 'block' }}
          />
          <div className="px-2"></div>
          <Input
            ref={node => {
              this.searchInput = node;
            }}
            placeholder={`Search Phone`}
            onChange={e => {}}
            onPressEnter={() => {}}
            style={{ width: 200, marginBottom: 8, display: 'block' }}
          />
          <div className="px-2"></div>
          <Input
            ref={node => {
              this.searchInput = node;
            }}
            placeholder={`Search Email`}
            onChange={e => {}}
            onPressEnter={() => {}}
            style={{ width: 200, marginBottom: 8, display: 'block' }}
          />
          <div className="px-2"></div>
          <Input
            ref={node => {
              this.searchInput = node;
            }}
            placeholder={`Search Birthday`}
            onChange={e => {}}
            onPressEnter={() => {}}
            style={{ width: 200, marginBottom: 8, display: 'block' }}
          />
          <div className="px-2"></div>
          <Button
            className="flex-auto"
            type="primary"
            icon={<SearchOutlined />}
            onClick={() => {
              this.fetch({
                pagination,
              });
              notification['success']({
                message: 'Success',
                description: '',
                duration: 1,
                // placement: 'bottomRight',
              });
            }}
            loading={loading}>
            Search
          </Button>
        </div>
        <Table
          {...this.state}
          columns={tableColumns}
          scroll={scroll}
          rowKey={record => record.id}
          dataSource={data}
          loading={loading}
          onChange={this.handleTableChange}
        />
      </div>
    );
  }
}

export default CardTableCustomers2;
