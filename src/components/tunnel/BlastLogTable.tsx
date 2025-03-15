// components/tunnel/BlastLogTable.tsx
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { BlastLogItem } from "@/resources/types";

interface BlastLogTableProps {
  data: BlastLogItem[];
}

const BlastLogTable: React.FC<BlastLogTableProps> = ({ data }) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Tunnel</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Pattern</TableHead>
            <TableHead>Explosive</TableHead>
            <TableHead>Result</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.date}</TableCell>
              <TableCell>{item.time}</TableCell>
              <TableCell>{item.tunnel}</TableCell>
              <TableCell>{item.location}</TableCell>
              <TableCell>{item.pattern}</TableCell>
              <TableCell>{item.explosive}</TableCell>
              <TableCell>{item.result}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default BlastLogTable;
