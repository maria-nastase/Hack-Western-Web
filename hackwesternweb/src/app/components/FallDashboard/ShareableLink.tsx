import React from "react";
import { Card } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Link, Copy, CheckCircle2 } from "lucide-react";
import { useState } from "react";

interface ShareableLinkProps {
  incidentId?: string;
  baseUrl?: string;
}

const ShareableLink = ({
  incidentId = "123",
  baseUrl = "https://example.com/fall",
}: ShareableLinkProps) => {
  const [copied, setCopied] = useState(false);

  const shareableUrl = `${baseUrl}/${incidentId}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareableUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy URL", err);
    }
  };

  return (
    <Card className="w-[500px] bg-white p-4 z-10 fixed bottom-0 left-0">
      <div className="flex items-center gap-3">
        <Link className="h-5 w-5 text-primary flex-shrink-0" />
        <div className="flex-1 truncate text-sm text-muted-foreground">
          {shareableUrl}
        </div>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
          onClick={handleCopy}
        >
          {copied ? (
            <>
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <span className="text-green-500">Copied</span>
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" />
              <span>Copy Link</span>
            </>
          )}
        </Button>
      </div>
    </Card>
  );
};

export default ShareableLink;
