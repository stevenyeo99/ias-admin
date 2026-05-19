import { Download, FileDown, FileText } from 'lucide-react';

import SectionTitle from '@/components/SectionTitle';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent
} from '@/components/ui/card';

export default function ExtractedDataPreview({ rows }) {
  return (
    <Card className="overflow-hidden">
      <SectionTitle icon={FileText}>Extracted Data <span className="normal-case text-blue-700">(Preview)</span></SectionTitle>
      <CardContent className="p-4">
        <div className="overflow-hidden rounded-md border">
          <table className="w-full border-collapse text-sm">
            <tbody>
              {rows.map((row) => (
                <tr key={row.label} className="border-b last:border-b-0">
                  <th className="w-[38%] bg-slate-50 px-4 py-2 text-left font-medium text-slate-800">
                    {row.label}
                  </th>
                  <td className="px-4 py-2 text-slate-700">{row.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-3">
          <Button type="button" variant="outline" className="h-10 border-emerald-300 text-emerald-700 hover:bg-emerald-50">
            <FileDown className="mr-2 h-4 w-4" />
            Generate CSV
          </Button>
          <Button type="button" className="h-10 bg-emerald-600 hover:bg-emerald-700">
            <Download className="mr-2 h-4 w-4" />
            Download CSV
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
