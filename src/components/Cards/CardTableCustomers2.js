import { Table, Button, Input, Space, notification, DatePicker, Alert, InputNumber, Breadcrumb } from 'antd';
import 'antd/dist/antd.css';
import React from 'react';
import reqwest from 'reqwest';
import Highlighter from 'react-highlight-words';
import { SearchOutlined, ReloadOutlined, HomeOutlined, UserOutlined } from '@ant-design/icons';

const { RangePicker } = DatePicker;

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
    searchName: '',
    searchPhone: '',
    searchEmail: '',
    searchBirthday: undefined,
    searchDate: {
      from: '',
      to: '',
    },
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
          {/* https://sansbornesaigon.mysapo.net/admin/customers/ */}
          <a href={`https://sansbornesaigon.mysapo.net/admin/customers/${record.id}`} target="_blank" rel="noreferrer">
            <p>Id: {record.id}</p>
          </a>
          <p>First Name: {record.first_name}</p>
          <p>Last Name: {record.last_name}</p>
          <p>Email: {record.email}</p>
          <p>Phone: {record.phone}</p>
          <p>Address1: {record.default_address.address1}</p>
          <p>Note: {record.note}</p>
          <p>Tags: {record.tags}</p>
          <p>Total Spent: {record.total_spent}</p>
          <p>Orders Count: {record.orders_count}</p>
          <p>Last Order Id: {record.last_order_id}</p>
          <p>Last Order Name: {record.last_order_name}</p>
          <p>Modified On: {record.modified_on}</p>
          <p>State: {record.state}</p>
          <p>Created On: {record.created_on != null ? new Date(record.created_on).toLocaleDateString('vi-VN') : ''}</p>
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

  handleTableChange = (paginationNew, filters, sorter, extra) => {
    console.log('params', paginationNew, filters, sorter, extra);
    const { pagination } = this.state;
    if (pagination.current != paginationNew.current) {
      this.setState({ pagination: paginationNew });
      const { searchName, searchPhone, searchEmail, searchDate, searchBirthday } = this.state;
      this.fetch({
        searchName,
        searchPhone,
        searchEmail,
        searchDate,
        searchBirthday,
        sortField: sorter.field,
        sortOrder: sorter.order,
        sorter: sorter.length == undefined ? [sorter] : sorter,
        pagination: paginationNew,
        ...filters,
      });
    }
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
          total: data.total, // 200 is mock data, you should read it from server
          // total: data.totalCount,
        },
      });
    });
  };

  onSearch = () => {
    const { pagination, searchName, searchPhone, searchEmail, searchDate, searchBirthday } = this.state;
    this.fetch({
      pagination,
      searchName,
      searchPhone,
      searchEmail,
      searchDate,
      searchBirthday,
    });
    notification['success']({
      message: 'Success',
      description: '',
      duration: 1,
      // placement: 'bottomRight',
    });
  };

  render() {
    const columns = [
      {
        title: 'Name',
        key: 'name',
        sortDirections: ['descend'],
        render: record => (
          <a href={`https://sansbornesaigon.mysapo.net/admin/customers/${record.id}`} target="_blank" rel="noreferrer">
            {record != null && record.first_name != null ? record.first_name : ''}
            {record != null && record.last_name != null ? ' ' + record.last_name : ''}
          </a>
        ),
        sorter: {
          compare: (a, b) => (a && b ? a.first_name.length - b.first_name.length : null),
          multiple: 1,
        },
        // ...this.getColumnSearchProps('name'),
      },
      {
        title: 'Phone',
        key: 'phone',
        render: record => record.phone,
        filterMultiple: false,
        onFilter: (value, record) => (record.phone || '').indexOf(value) === 0,
        sorter: (a, b) => (a.phone || '').length - (b.phone || '').length,
        sortDirections: ['descend', 'ascend'],
        // ...this.getColumnSearchProps('phone'),
      },
      {
        title: 'Email',
        key: 'email',
        dataIndex: 'email',
        filterMultiple: false,
        onFilter: (value, record) => (record.email || '').indexOf(value) === 0,
        sorter: (a, b) => (a.email || '').length - (b.email || '').length,
        sortDirections: ['descend', 'ascend'],
        // ...this.getColumnSearchProps('email'),
      },
      {
        title: 'Birthday',
        key: 'birthday',
        dataIndex: 'birthday',
        render: record => `${record ? new Date(record).toLocaleDateString('vi-VN') : ''}`,
        filterMultiple: false,
        onFilter: (value, record) => (record.birthday || '').indexOf(value) === 0,
        sorter: (a, b) => (a.birthday || '').length - (b.birthday || '').length,
        sortDirections: ['descend', 'ascend'],
        // ...this.getColumnSearchProps('birthday'),
      },
      {
        title: 'Membership',
        dataIndex: 'class',
        key: 'class',
        render: record => `${(record || 'member').toUpperCase()}`,
        filterMultiple: false,
        filters: [
          {
            text: 'Gold',
            value: 'gold',
          },
          {
            text: 'Member',
            value: 'member',
          },
        ],
        onFilter: (value, record) => (record.class || 'member').indexOf(value) === 0,
        sorter: (a, b) => (a.class || '').length - (b.class || '').length,
        sortDirections: ['descend', 'ascend'],
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
        onFilter: (value, record) => (record.gender || '').indexOf(value) === 0,
      },
      {
        title: 'Total Spent',
        key: 'total_spent',
        dataIndex: 'total_spent',
        sorter: (a, b) => (a.total_spent || 0) - (b.total_spent || 0),
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

    const { data, loading, pagination, searchBirthday } = this.state;
    const { searchName, searchPhone, searchEmail } = this.state;

    return (
      <div className="bg-white rounded px-3 py-2">
        <div
          className="mb-2 flex flex-row"
          style={{
            justifyContent: 'space-between',
          }}>
          <div className="flex flex-row fcenter">
            <span className="px-2">Have birthdays in the next</span>{' '}
            <InputNumber
              ref={node => {
                this.searchInput = node;
              }}
              // defaultValue={searchBirthday}
              formatter={value => `${value}`}
              placeholder={`Birthday`}
              onChange={value => {
                this.setState({ searchBirthday: value });
              }}
              onPressEnter={() => {
                this.onSearch();
              }}
              value={searchBirthday}
              style={{
                height: '30px',
                width: 100,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onSubmit={() => {
                this.onSearch();
              }}
            />
            <span className="px-2"> days</span>
          </div>
          <Button
            // type="primary"
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '40px',
              maxWidth: '200px',
            }}
            icon={<ReloadOutlined />}
            onClick={() => {
              this.fetch({
                pagination,
              });
              this.setState({
                searchName: '',
                searchPhone: '',
                searchEmail: '',
                searchDate: {
                  from: '',
                  to: '',
                },
                searchBirthday: undefined,
              });
              notification['success']({
                message: 'Success',
                description: '',
                duration: 1,
              });
            }}
            loading={loading}>
            Reload
          </Button>{' '}
        </div>
        <div
          className="mb-2 flex fcenter"
          style={{
            justifyContent: 'space-between',
          }}>
          <div className="flex flex-row fcenter">
            <Input
              value={searchName}
              ref={node => {
                this.searchInput = node;
              }}
              placeholder={`Search Name`}
              onChange={e => {
                this.setState({ searchName: e.target.value });
              }}
              onPressEnter={() => {
                this.onSearch();
              }}
              style={{ height: '40px', width: 200, display: 'block' }}
              onSubmit={() => {
                this.onSearch();
              }}
            />
            <div className="px-2"></div>
            <Input
              value={searchPhone}
              ref={node => {
                this.searchInput = node;
              }}
              placeholder={`Search Phone`}
              onChange={e => {
                this.setState({ searchPhone: e.target.value });
              }}
              onPressEnter={() => {
                this.onSearch();
              }}
              style={{ height: '40px', width: 200, display: 'block' }}
              onSubmit={() => {
                this.onSearch();
              }}
            />
            <div className="px-2"></div>
            <Input
              value={searchEmail}
              ref={node => {
                this.searchInput = node;
              }}
              placeholder={`Search Email`}
              onChange={e => {
                this.setState({ searchEmail: e.target.value });
              }}
              onPressEnter={() => {
                this.onSearch();
              }}
              style={{ height: '40px', width: 200, display: 'block' }}
              onSubmit={() => {
                this.onSearch();
              }}
            />
            <div className="px-2"></div>
            {/* <RangePicker
            style={{ height: '40px' }}
            onChange={(fromMoment, toMoment) =>
              this.setState({
                searchDate: {
                  from: fromMoment ? fromMoment[0].toISOString() : '',
                  //   (toMoment[0]).toISOString(),
                  to: fromMoment ? fromMoment[0].toISOString() : '',
                  //   (toMoment[1]).toISOString(),
                },
              })
            }
            onSubmit={() => {
              this.onSearch();
            }}
          />
          <div className="px-2"></div> */}
          </div>{' '}
          <Button
            className="fcenter flex-auto"
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '40px',
              maxWidth: '200px',
            }}
            type="primary"
            icon={<SearchOutlined />}
            onClick={() => {
              this.onSearch();
            }}
            loading={loading}>
            Search
          </Button>
        </div>
        <div
          className="mt-4 mb-2 flex flex-row"
          style={{
            justifyContent: 'space-between',
          }}>
          <div className="px-2"></div>
        </div>
        <Table
          {...this.state}
          columns={tableColumns}
          scroll={scroll}
          rowKey={record => record._id}
          dataSource={data}
          loading={loading}
          onChange={this.handleTableChange}
        />
      </div>
    );
  }
}

export default CardTableCustomers2;
