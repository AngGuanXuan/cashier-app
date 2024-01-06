"use client";
import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";

export default function Home() {
  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    pageStyle: `@media print {
      @page {
        size: 48mm auto;
        margin: 20mm 0;
      }
    }`,
    content: () => componentRef.current,
  });

  return (
    <main>
      <div>
        <div>
          <div ref={componentRef} className="p-2 text-xs font-mono">
            <div className="border-b-2 border-dashed border-black pb-4 text-center space-y-2">
              <h2>LCCL ENTERPRISE</h2>
              <h3>SS15 SUBANG JAYA</h3>
            </div>
            <div>
              <div className="pt-4">
                <h2>Invoice No - 00010001</h2>
                <h2>06&#92;01&#92;2024 17&#69706;00&#69706;00</h2>
              </div>
              <div className="pt-2">
                <h2>Table No &#69706; LCCL01</h2>
              </div>
              <div className="pt-6">
                <h2 className="uppercase">Transaction Details</h2>
              </div>
              <div className="pt-2">
                <h2 className="uppercase">&#91;Snooker&#93;</h2>
                <h2>Rate &#61; 3.00 &#92; 1 hr</h2>
              </div>
              <div className="pt-2">
                <h2 className="uppercase">&#91;Snooker&#93;</h2>
                <h2>16&#69706;00 &#8210; 16&#69706;59 &#61; 0&#69706;59</h2>
              </div>
              <div className="pt-2">
                <h2 className="uppercase">&#91;Food &#38; Beverage&#93;</h2>
                <div>
                  <h2 className="flex">
                    100 Plus &#61; <span className="ms-auto">RM 2.50</span>
                  </h2>
                  <h2 className="flex">
                    &#10761;2 &#61; <span className="ms-auto">RM 2.50</span>
                  </h2>
                </div>
              </div>
              <div className="pt-4 space-y-2">
                <h2>15.80 &#45; &#91; DIS&#93; 0.00 &#61;</h2>
                <h2 className="text-end">RM 15.80</h2>
              </div>
              <div className="border-b-2 border-dashed border-black py-4"></div>
            </div>
            <div className="text-lg pt-4 flex">
              <h1>Total</h1>
              <h1 className="mx-auto">15.80</h1>
            </div>
            <div className="capitalize text-center pt-10">
              <h1>Thank You For Visit</h1>
              <h1>Please Come Again</h1>
            </div>
          </div>
          <button onClick={handlePrint}>Print this out!</button>
        </div>
      </div>
    </main>
  );
}
