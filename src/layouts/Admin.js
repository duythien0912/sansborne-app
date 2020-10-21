/* eslint-disable react/prop-types */
import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import { useRouter } from 'next/router';
import Link from 'next/link';

const { Header, Content, Footer } = Layout;

// components

import AdminNavbar from 'components/Navbars/AdminNavbar.js';
import Sidebar from 'components/Sidebar/Sidebar.js';
import HeaderStats from 'components/Headers/HeaderStats.js';
import FooterAdmin from 'components/Footers/FooterAdmin.js';

export default function Admin({ children }) {
  const router = useRouter();

  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
        <Menu style={{ float: 'right' }} theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">
            <Link href="/admin/customers">
              <a
                href="#pablo"
                className={
                  'text-xs uppercase py-3 font-bold' +
                  (router.pathname.indexOf('/admin/customers') !== -1
                    ? 'text-blue-500 hover:text-blue-600'
                    : 'text-gray-800 hover:text-gray-600')
                }>
                <i
                  className={
                    'fas fa-users mr-2 text-sm ' +
                    (router.pathname.indexOf('/admin/customers') !== -1 ? 'opacity-75' : 'text-gray-400')
                  }></i>{' '}
                Customers
              </a>
            </Link>
          </Menu.Item>
          <Menu.Item key="2">
            {' '}
            <Link href="/admin/tables">
              <a
                href="#pablo"
                className={
                  'text-xs uppercase py-3 font-bold' +
                  (router.pathname.indexOf('/admin/tables') !== -1
                    ? 'text-blue-500 hover:text-blue-600'
                    : 'text-gray-800 hover:text-gray-600')
                }>
                <i
                  className={
                    'fas fa-code mr-2 text-sm ' +
                    (router.pathname.indexOf('/admin/tables') !== -1 ? 'opacity-75' : 'text-gray-400')
                  }></i>{' '}
                Events
              </a>
            </Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link href="/admin/settings">
              <a
                href="#pablo"
                className={
                  'text-xs uppercase py-3 font-bold' +
                  (router.pathname.indexOf('/admin/settings') !== -1
                    ? 'text-blue-500 hover:text-blue-600'
                    : 'text-gray-800 hover:text-gray-600')
                }>
                <i
                  className={
                    'fas fa-money-check mr-2 text-sm ' +
                    (router.pathname.indexOf('/admin/settings') !== -1 ? 'opacity-75' : 'text-gray-400')
                  }></i>{' '}
                Membership Settings
              </a>
            </Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Link href="/admin/cron">
              <a
                href="#pablo"
                className={
                  'text-xs uppercase py-3 font-bold' +
                  (router.pathname.indexOf('/admin/cron') !== -1
                    ? 'text-blue-500 hover:text-blue-600'
                    : 'text-gray-800 hover:text-gray-600')
                }>
                <i
                  className={
                    'fas fa-money-check mr-2 text-sm ' +
                    (router.pathname.indexOf('/admin/cron') !== -1 ? 'opacity-75' : 'text-gray-400')
                  }></i>{' '}
                Cron Settings
              </a>
            </Link>
          </Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        {/* <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb> */}
        <div className="site-layout-content">{children}</div>
      </Content>
    </Layout>

    // <>
    //   {/* <Sidebar /> */}
    //   <div className="relative md:ml-64">
    //     <AdminNavbar />
    //     {/* Header */}
    //     <HeaderStats />
    //     <div className="px-2 md:px-2 mx-auto w-full -m-24">
    //       {children}
    //       <FooterAdmin />
    //     </div>
    //   </div>
    // </>
  );
}
