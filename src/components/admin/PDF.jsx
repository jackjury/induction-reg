import React, { Component } from "react";
import { Button } from "react-bootstrap";
import jsPDF from "jspdf";
import "jspdf-autotable";

function PDF({ data, project, headers }) {
  const exportPDF = () => {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "landscape"; // portrait or landscape

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(15);

    const title = project.name;
    // const headers = [["NAME", "PROFESSION"]];

    data = data.map((elt) => [
      elt.created_at,
      elt.name,
      elt.company,
      elt.signature,
    ]);

    let content = {
      html: "#induction-reg",
      startY: 50,
      // head: headers,
      // body: data,
      bodyStyles: { minCellHeight: 15 },

      didDrawCell: function (data) {
        console.log(data);
        if (data.column.index === 3 && data.cell.section === "body") {
          var td = data.cell.raw;
          var img = td.getElementsByTagName("img")[0];
          var dim = data.cell.height;
          doc.addImage(img.src, data.cell.x, data.cell.y, 75, dim);
        }
      },
    };
    doc.text(title, marginLeft, 40);
    doc.autoTable(content);

    doc.save("report.pdf");
  };
  return (
    <>
      <Button
        onClick={() => {
          exportPDF();
        }}
      >
        PDF
      </Button>
    </>
  );
}

export default PDF;
