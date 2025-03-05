export function DeltedSite() {
  return (
    <div
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        backgroundColor: "black",
        zIndex: "9999",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        fontFamily: "monospace",
      }}
    >
      <div
        style={{
          fontSize: "24px",
          marginBottom: "20px",
        }}
      >
        All files deleted. System corrupted.
      </div>

      <div
        style={{
          width: "80%",
          maxWidth: "600px",
          height: "300px",
          backgroundColor: "#101828",
          border: "1px solid #333",
          padding: "20px",
          overflowY: "auto",
          color: "#ff0000",
        }}
      >
        <div>rm: removing all files</div>
        <br />
        <div>rm: removed 'system32'</div>
        <div>rm: removed 'boot.ini'</div>
        <div>rm: removed 'user_data'</div>
        <div>rm: removed 'config.sys'</div>
        <div>rm: removed 'index.html'</div>
        <div>rm: removed 'styles.css'</div>
        <div>rm: removed 'app.jsx'</div>
        <div>
          <br />
        </div>
        <div>System shutdown imminent...</div>
      </div>
    </div>
  );
}
