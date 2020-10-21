/* eslint-disable no-unused-vars */
// components

// import CardTable from 'components/Cards/CardTable.js';
// layout for page
// import Admin from 'layouts/Admin.js';
import Router from 'next/router';
import React, { useState } from 'react';
// import Link from 'next/link';
import Auth from 'layouts/Auth.js';
import { notification } from 'antd';

export default function Login() {
  const [storeDomain, setStoreDomain] = useState('sansbornesaigon.mysapo.net');
  const [api_key, set_api_key] = useState('3a09a8b25aa64f45807cf45b27e87e96');
  // const [api_key, set_api_key] = useState('85b27093434d4157be3d9d3ad17a2de3');
  const [scopes, set_scopes] = useState(
    'read_content,write_content,read_themes,write_themes,read_customers,write_customers/read_orders,write_orders,read_script_tags,write_script_tags,read_price_rules,write_price_rules,read_draft_orders,write_draft_orders'
  );
  const [redirect_uri, set_redirect_uri] = useState('http://128.199.155.161:3000/admin/settings');
  // const [redirect_uri, set_redirect_uri] = useState('http://localhost:3000/admin/settings');

  const onClickSave = async () => {
    try {
      Router.push(
        `https://${storeDomain}/admin/oauth/authorize?client_id=${api_key}&scope=${scopes}&redirect_uri=${redirect_uri}`
      );
    } catch (e) {
      notification['error']({
        message: `Failed: ${e}`,
        description: '',
        duration: 1,
      });
    }
  };

  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-8/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0">
              <div className="rounded-t mb-0 py-4"></div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <div className="font-semibold text-4xl text-gray-700 text-center mb-3">
                  <h6>Membership App</h6>
                </div>
                <form>
                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
                      Store name
                    </label>
                    <input
                      type="text"
                      className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                      placeholder="sansbornesaigon.mysapo.net"
                      onChange={e => setStoreDomain(e.target.value)}
                      defaultValue="sansbornesaigon.mysapo.net"
                    />
                  </div>
                  <div className="text-center mt-6">
                    <button
                      className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => onClickSave()}>
                      &gt; Install
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
Login.layout = Auth;
