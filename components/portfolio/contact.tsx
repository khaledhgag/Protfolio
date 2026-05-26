"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, MapPin, Phone, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeading } from "./section-heading";
import { contactSchema, type ContactInput } from "@/lib/validations";
import { toast } from "sonner";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "khaledabuelenein@example.com",
    href: "mailto:khaledabuelenein@example.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+20 123 456 7890",
    href: "tel:+201234567890",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Cairo, Egypt",
  },
];

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactInput) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to send message");

      toast.success("Message sent successfully! I'll get back to you soon.");
      reset();
    } catch {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-24">
      {/* Background Elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute bottom-0 left-1/4 size-96 rounded-full bg-primary/5 blur-[100px]" />
      </div>

      <div className="container relative mx-auto px-4">
        <SectionHeading
          title="Get In Touch"
          subtitle="Have a project in mind or just want to say hi? I'd love to hear from you!"
        />

        <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-5">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6 lg:col-span-2"
          >
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Let&apos;s Connect</h3>
              <p className="text-muted-foreground">
                I&apos;m currently open to freelance opportunities and exciting
                projects. Whether you have a question or just want to say hi,
                I&apos;ll try my best to get back to you!
              </p>
            </div>

            <div className="space-y-4">
              {contactInfo.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  {item.href ? (
                    <a
                      href={item.href}
                      className="flex items-center gap-4 rounded-lg p-3 transition-colors hover:bg-muted"
                    >
                      <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <item.icon className="size-5" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          {item.label}
                        </p>
                        <p className="font-medium">{item.value}</p>
                      </div>
                    </a>
                  ) : (
                    <div className="flex items-center gap-4 p-3">
                      <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <item.icon className="size-5" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          {item.label}
                        </p>
                        <p className="font-medium">{item.value}</p>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <Card className="border-border/50">
              <CardContent className="p-6">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        Name
                      </label>
                      <Input
                        id="name"
                        placeholder="Your name"
                        {...register("name")}
                        aria-invalid={!!errors.name}
                      />
                      {errors.name && (
                        <p className="text-sm text-destructive">
                          {errors.name.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email
                      </label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        {...register("email")}
                        aria-invalid={!!errors.email}
                      />
                      {errors.email && (
                        <p className="text-sm text-destructive">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">
                      Subject
                    </label>
                    <Input
                      id="subject"
                      placeholder="What's this about?"
                      {...register("subject")}
                      aria-invalid={!!errors.subject}
                    />
                    {errors.subject && (
                      <p className="text-sm text-destructive">
                        {errors.subject.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Your message..."
                      rows={5}
                      {...register("message")}
                      aria-invalid={!!errors.message}
                    />
                    {errors.message && (
                      <p className="text-sm text-destructive">
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    size="lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 size-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 size-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
