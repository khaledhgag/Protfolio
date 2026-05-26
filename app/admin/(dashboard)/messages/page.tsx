"use client";

import { useState } from "react";
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
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt: string;
}

const sampleMessages: Message[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    subject: "Project Inquiry",
    message: "Hi Khaled, I came across your portfolio and was impressed by your work. I'd like to discuss a potential project...",
    read: false,
    createdAt: "2024-01-20T10:30:00Z",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@company.com",
    subject: "Job Opportunity",
    message: "Hello! We have an exciting opportunity at our company that might interest you. Would you be available for a call?",
    read: true,
    createdAt: "2024-01-18T14:15:00Z",
  },
];

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>(sampleMessages);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filteredMessages = messages.filter(
    (msg) =>
      msg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const unreadCount = messages.filter((m) => !m.read).length;

  const toggleRead = (id: string) => {
    setMessages(
      messages.map((m) => (m.id === id ? { ...m, read: !m.read } : m))
    );
  };

  const handleDelete = (id: string) => {
    setMessages(messages.filter((m) => m.id !== id));
    if (selectedMessage?.id === id) setSelectedMessage(null);
    toast.success("Message deleted");
    setDeleteId(null);
  };

  const selectMessage = (message: Message) => {
    setSelectedMessage(message);
    if (!message.read) {
      toggleRead(message.id);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Messages</h1>
        <p className="text-muted-foreground">
          Contact form submissions from your portfolio
        </p>
      </div>

      {/* Stats */}
      <div className="flex gap-4">
        <Badge variant={unreadCount > 0 ? "default" : "secondary"}>
          {unreadCount} unread
        </Badge>
        <Badge variant="outline">{messages.length} total</Badge>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search messages..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Messages Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Message List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-3"
        >
          {filteredMessages.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Mail className="mb-4 size-12 text-muted-foreground" />
                <p className="text-muted-foreground">No messages found</p>
              </CardContent>
            </Card>
          ) : (
            filteredMessages.map((message) => (
              <Card
                key={message.id}
                className={cn(
                  "cursor-pointer transition-all hover:border-primary/50",
                  selectedMessage?.id === message.id && "border-primary",
                  !message.read && "bg-primary/5"
                )}
                onClick={() => selectMessage(message)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        {!message.read && (
                          <span className="size-2 rounded-full bg-primary" />
                        )}
                        <span className="font-medium">{message.name}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {message.email}
                      </p>
                      <p className="mt-1 font-medium">{message.subject}</p>
                      <p className="mt-1 truncate text-sm text-muted-foreground">
                        {message.message}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="size-3" />
                        {new Date(message.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </motion.div>

        {/* Message Detail */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {selectedMessage ? (
            <Card className="sticky top-6">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>{selectedMessage.subject}</CardTitle>
                    <CardDescription>
                      From {selectedMessage.name} ({selectedMessage.email})
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => toggleRead(selectedMessage.id)}
                    >
                      {selectedMessage.read ? (
                        <MailOpen className="size-4" />
                      ) : (
                        <Mail className="size-4" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive hover:text-destructive"
                      onClick={() => setDeleteId(selectedMessage.id)}
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="size-4" />
                  {new Date(selectedMessage.createdAt).toLocaleString()}
                </div>
                <div className="whitespace-pre-wrap rounded-lg bg-muted p-4">
                  {selectedMessage.message}
                </div>
                <div className="mt-4 flex gap-2">
                  <Button asChild>
                    <a href={`mailto:${selectedMessage.email}`}>
                      <Mail className="mr-2 size-4" />
                      Reply via Email
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-24">
                <Mail className="mb-4 size-12 text-muted-foreground" />
                <p className="text-muted-foreground">
                  Select a message to view details
                </p>
              </CardContent>
            </Card>
          )}
        </motion.div>
      </div>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Message</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this message? This action cannot
              be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteId && handleDelete(deleteId)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
