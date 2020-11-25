import React from 'react';
import Link from 'next/link';
// components
/* eslint-disable react/prop-types */
import { Layout, Menu, Breadcrumb } from 'antd';
import { useRouter } from 'next/router';

const { Header, Content, Footer } = Layout;

// components

import AdminNavbar from 'components/Navbars/AdminNavbar.js';
import IndexNavbar from 'components/Navbars/IndexNavbar.js';
import Sidebar from 'components/Sidebar/Sidebar.js';
import HeaderStats from 'components/Headers/HeaderStats.js';
import FooterAdmin from 'components/Footers/FooterAdmin.js';

export default function Navbar(props) {
  const router = useRouter();
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  return (
    <>
      <nav className="top-0 fixed z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg bg-white shadow">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <Link href="/">
              <a
                className="text-gray-800 text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-no-wrap uppercase"
                href="#pablo">
                Sansborne Membership
              </a>
            </Link>
            <button
              className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}>
              <i className="fas fa-bars"></i>
            </button>
          </div>
          <div
            className={
              'lg:flex flex-grow items-center bg-white lg:bg-transparent lg:shadow-none' +
              (navbarOpen ? ' block' : ' hidden')
            }
            id="example-navbar-warning">
            <ul style={{ marginBottom: 0 }} className="flex flex-col lg:flex-row list-none lg:ml-auto">
              <li className="flex items-center">
                <Link href="/admin/customers">
                  <button
                    className="
                    bg-gray-800 text-white
                    active:bg-gray-700 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150"
                    type="button"
                    style={
                      router.pathname.indexOf('/admin/customers') !== -1
                        ? { background: '#cfba63', color: '#2d363c' }
                        : {}
                    }>
                    <i
                      className={
                        'fas fa-users mr-2 text-sm ' +
                        (router.pathname.indexOf('/admin/customers') !== -1 ? 'opacity-75' : 'text-gray-400')
                      }></i>{' '}
                    Customers
                  </button>
                </Link>
              </li>

              <li className="flex items-center">
                <Link href="/admin/tables">
                  <button
                    className="bg-gray-800 text-white active:bg-gray-700 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150"
                    type="button"
                    style={
                      router.pathname.indexOf('/admin/tables') !== -1 ? { background: '#cfba63', color: '#2d363c' } : {}
                    }>
                    <i
                      className={
                        'fas fa-code mr-2 text-sm ' +
                        (router.pathname.indexOf('/admin/tables') !== -1 ? 'opacity-75' : 'text-gray-400')
                      }></i>{' '}
                    Events
                  </button>
                </Link>
              </li>

              <li className="flex items-center">
                <Link href="/admin/settings">
                  <button
                    className="bg-gray-800 text-white active:bg-gray-700 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150"
                    type="button"
                    style={
                      router.pathname.indexOf('/admin/settings') !== -1
                        ? { background: '#cfba63', color: '#2d363c' }
                        : {}
                    }>
                    <i
                      className={
                        'fas fa-money-check mr-2 text-sm ' +
                        (router.pathname.indexOf('/admin/settings') !== -1 ? 'opacity-75' : 'text-gray-400')
                      }></i>{' '}
                    Membership Settings
                  </button>
                </Link>
              </li>
              <li className="flex items-center">
                <Link href="/admin/cron">
                  <button
                    className="bg-gray-800 text-white active:bg-gray-700 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150"
                    type="button"
                    style={
                      router.pathname.indexOf('/admin/cron') !== -1 ? { background: '#cfba63', color: '#2d363c' } : {}
                    }>
                    <i
                      className={
                        'fas fa-redo-alt mr-2 text-sm ' +
                        (router.pathname.indexOf('/admin/cron') !== -1 ? 'opacity-75' : 'text-gray-400')
                      }></i>{' '}
                    Cron Settings
                  </button>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
