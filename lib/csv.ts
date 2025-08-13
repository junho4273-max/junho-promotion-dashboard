
import { Row } from "./data";

export function exportCsv(rows: Row[]) {
  const header = ["month","teamMember","productGroup","premiumType","premium","meetings","proposals","contracts"];
  const body = rows.map(r =>
    [r.month, r.teamMember, r.productGroup, r.premiumType, r.premium, r.meetings, r.proposals, r.contracts]
      .map(v => `"${String(v).replace(/"/g,'""')}"`).join(",")
  );
  const csv = [header.join(","), ...body].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = "export.csv";
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
