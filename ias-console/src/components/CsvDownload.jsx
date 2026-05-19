import { Download } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';

export default function CsvDownload() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>CSV Export</CardTitle>
        <CardDescription>InsureNet CSV output will be available after extraction.</CardDescription>
      </CardHeader>
      <CardContent>
        <Button type="button" variant="outline" disabled>
          <Download className="mr-2 h-4 w-4" />
          Download CSV
        </Button>
      </CardContent>
    </Card>
  );
}
