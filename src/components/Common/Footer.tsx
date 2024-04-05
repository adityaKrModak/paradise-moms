import React from "react";

function Footer() {
  return (
    <div className="text-white">
      <div className="flex bg-[#173B1A] h-[42vh] mt-[20vh] justify-center gap-20 ">
        <div className="flex flex-col mt-12">
          <h6 className="font-[500] ">About Paradise Moms</h6>
          <p className="text-[#618062] w-[30vw] text-xs mt-3">
            Morbi cursus porttitor enim lobortis molestie. Duis gravida turpis
            dui, eget bibendum magna congue nec.
          </p>
          <span className="mt-3 text-sm">
            <span className="border-b-2-grey-500">2264654577</span>
            <span className="text-[#618062]"> or </span>
            <span>Paradisemoms@gmail.com</span>
          </span>
        </div>

        <div>
          <table className=" border-collapse text-[0.7rem] mt-12 text-[#618062]">
            <tr className="text-white font-[500] text-[16px]">
              <td>My Account</td>
              <td>Helps</td>
              <td>Proxy</td>
            </tr>
            <tbody>
              <tr>
                <td>My Account</td>
                <td>Contact</td>
                <td>About</td>
              </tr>

              <tr>
                <td>Order History</td>
                <td>Faq</td>
                <td>Shop</td>
              </tr>

              <tr>
                <td>Shopping Cart </td>
                <td>Terms & Condition</td>
                <td>Product</td>
              </tr>
              <tr>
                <td>Wishlist</td>
                <td>Privacy Policy</td>
                <td>Products Details</td>
              </tr>
              <tr>
                <td>Settings</td>
                <td></td>
                <td>Track Order</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Footer;
