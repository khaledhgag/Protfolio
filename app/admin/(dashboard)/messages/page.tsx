"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, MailOpen, Trash2, Search, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface Message {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMessage, setSelectedMessage] =
    useState<Message | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await fetch("/api/messages");
      const data = await res.json();
      setMessages(data);
    } catch {
      toast.error("Failed to load messages");
    } finally {
      setLoading(false);
    }
  };

  const filteredMessages = messages.filter(
    (msg) =>
      msg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const unreadCount = messages.filter((m) => !m.read).length;

  const toggleRead = async (id: string) => {
    try {
      await fetch(`/api/messages?id=${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ read: true }),
      });

      setMessages((prev) =>
        prev.map((m) =>
          m._id === id ? { ...m, read: !m.read } : m
        )
      );

      if (selectedMessage?._id === id) {
        setSelectedMessage({
          ...selectedMessage,
          read: !selectedMessage.read,
        });
      }
    } catch {
      toast.error("Failed to update");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/messages?id=${id}`, {
        method: "DELETE",
      });

      setMessages((prev) =>
        prev.filter((m) => m._id !== id)
      );

      if (selectedMessage?._id === id) {
        setSelectedMessage(null);
      }

      toast.success("Message deleted");
      setDeleteId(null);
    } catch {
      toast.error("Delete failed");
    }
  };

  const selectMessage = (message: Message) => {
    setSelectedMessage(message);

    if (!message.read) {
      toggleRead(message._id);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Messages</h1>
        <p className="text-muted-foreground">
          Contact form submissions
        </p>
      </div>

      <div className="flex gap-4">
        <Badge variant={unreadCount > 0 ? "default" : "secondary"}>
          {unreadCount} unread
        </Badge>
        <Badge variant="outline">
          {messages.length} total
        </Badge>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search messages..."
          value={searchQuery}
          onChange={(e) =>
            setSearchQuery(e.target.value)
          }
          className="pl-10"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-3"
        >
          {filteredMessages.map((message) => (
            <Card
              key={message._id}
              className={cn(
                "cursor-pointer",
                selectedMessage?._id === message._id &&
                  "border-primary",
                !message.read && "bg-primary/5"
              )}
              onClick={() => selectMessage(message)}
            >
              <CardContent className="p-4">
                <div className="flex justify-between">
                  <div>
                    <div className="font-medium">
                      {message.name}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {message.email}
                    </p>
                    <p>{message.subject}</p>
                  </div>

                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="size-3" />
                    {new Date(
                      message.createdAt
                    ).toLocaleDateString()}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {selectedMessage ? (
            <Card>
              <CardHeader>
                <div className="flex justify-between">
                  <div>
                    <CardTitle>
                      {selectedMessage.subject}
                    </CardTitle>
                    <CardDescription>
                      {selectedMessage.name} (
                      {selectedMessage.email})
                    </CardDescription>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() =>
                        toggleRead(
                          selectedMessage._id
                        )
                      }
                    >
                      {selectedMessage.read ? (
                        <MailOpen />
                      ) : (
                        <Mail />
                      )}
                    </Button>

                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() =>
                        setDeleteId(
                          selectedMessage._id
                        )
                      }
                    >
                      <Trash2 />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <div className="whitespace-pre-wrap rounded-lg bg-muted p-4">
                  {selectedMessage.message}
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="py-24 text-center">
                Select a message
              </CardContent>
            </Card>
          )}
        </motion.div>
      </div>

      <AlertDialog
        open={!!deleteId}
        onOpenChange={() => setDeleteId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Delete Message
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure?
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() =>
                deleteId &&
                handleDelete(deleteId)
              }
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}