import express from "express";
import { S3 } from "aws-sdk";

const app = express();

app.listen("3001", () => {
  console.log("server listeining at 3001");
});

const s3 = new S3({
  accessKeyId: "57bb9a79735bc75e8cb4a481aadacee8",
  secretAccessKey:
    "d70e104fa239679cb6ee85c9785eaf0e3a6fcfa56197bad58b6506073092b768",
  endpoint: "https://1783b6098998d87c4500c4602dd62b05.r2.cloudflarestorage.com",
});

app.get("/*", async (req, res) => {
  const hostname = req.hostname;
  console.log("hostname", hostname);
  const id = hostname.split(".")[0];
  const filePath = req.path;
  const contents = await s3
    .getObject({
      Bucket: "vercel",
      Key: `dist/${id}${filePath}`,
    })
    .promise();
  const type = filePath.endsWith("html")
    ? "text/html"
    : filePath.endsWith("css")
    ? "text/html"
    : "application/javascript";
  res.set("Content-Type", type);
  res.send(contents.Body);
  console.log("id", id);
});
