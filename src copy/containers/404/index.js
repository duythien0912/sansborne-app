import React from 'react';
// import Link from 'next/link';
import { Link } from '../../../i18n';

function Svg404() {
  return (
    <div className="center_div">
      <div className="emoji">
        <img src="/static/images/unicorn.gif" width={250} />
      </div>
      <p className="title">Ooooops!</p>
      <br></br>
      <br></br>
      <p className="text">This page doesn&apos;t exist anymore.</p>
      <Link href="/">
        <button type="button" className="registerButton">
          Return Home
        </button>
      </Link>
      <br></br>
      <br></br>
      <br></br>
    </div>
  );
}

export default Svg404;
