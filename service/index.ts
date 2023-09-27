import * as pulumi from "@pulumi/pulumi";
import * as gcp from "@pulumi/gcp";

// Create a GCP resource (Storage Bucket)
const bucket = new gcp.storage.Bucket("create-bucket", {
    location: "europe-west1",
    name: "pulumi-gen-bucket"
});

// Make the bucket public by adjusting IAM policy
const publicReadBinding = new gcp.storage.BucketIAMMember("public-read", {
    bucket: bucket.name,
    role: "roles/storage.objectViewer",
    member: "allUsers",
});

const file = new gcp.storage.BucketObject("upload-file", {
    bucket: bucket.name,
    // replace this with the path to your source file
    source: new pulumi.asset.FileAsset("./do.jpg"),
});

// Export the DNS name of the bucket
export const bucketName = bucket.url;
export const fileUrl = file.selfLink;
