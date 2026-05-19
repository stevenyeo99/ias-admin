import JobForm from '../components/JobForm.jsx';
import JobLogs from '../components/JobLogs.jsx';
import ExtractedDataPreview from '../components/ExtractedDataPreview.jsx';
import CsvDownload from '../components/CsvDownload.jsx';

const pageStyle = {
  minHeight: '100vh',
  background: '#f5f7fa',
  color: '#1f2937',
  fontFamily: 'Arial, sans-serif'
};

const headerStyle = {
  background: '#ffffff',
  borderBottom: '1px solid #d8dee7',
  padding: '16px 24px'
};

const contentStyle = {
  display: 'grid',
  gap: '16px',
  gridTemplateColumns: 'minmax(280px, 360px) 1fr',
  padding: '24px'
};

const panelStyle = {
  background: '#ffffff',
  border: '1px solid #d8dee7',
  borderRadius: '6px',
  padding: '16px'
};

export default function DashboardPage() {
  return (
    <main style={pageStyle}>
      <header style={headerStyle}>
        <h1 style={{ margin: 0, fontSize: '20px' }}>IAS Automation Console</h1>
      </header>
      <section style={contentStyle}>
        <div style={panelStyle}>
          <JobForm />
        </div>
        <div style={{ display: 'grid', gap: '16px' }}>
          <div style={panelStyle}>
            <JobLogs />
          </div>
          <div style={panelStyle}>
            <ExtractedDataPreview />
          </div>
          <div style={panelStyle}>
            <CsvDownload />
          </div>
        </div>
      </section>
    </main>
  );
}
