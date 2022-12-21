import { NextResponse } from "next/server";
import { cookieSerializeOptions, ssoLogin } from "../../lib/auth";
import cookie from "cookie";

export async function getServerSideProps(context: any) {
  //console.log(context.query.token);
  let token = context.query.token;
  let hasFailed = true;

  if (token) {
    let loginTokenRes = await ssoLogin(token);
    if (loginTokenRes.success) {
      context.res.writeHead(301, {
        Location: "/",
        "Set-Cookie": cookie.serialize(
          "token",
          await loginTokenRes.token,
          cookieSerializeOptions
        ),
      });
      context.res.end();

      // return {
      //   redirect: {
      //     permanent: false,
      //     destination: "/",
      //   },
      // };
    }
  }
  return {
    props: { hasFailed },
  };
}

const SSO: React.FC<any> = ({ hasFailed = false }) => {
  return (
    <>
      {!hasFailed && <div className="text-sm">Please wait</div>}
      {hasFailed && <div className="text-sm">Invalid URL</div>}
    </>
  );
};

export default SSO;
