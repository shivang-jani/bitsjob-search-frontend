import * as React from "react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useAuth } from "@/hooks/useAuth"
import { buildApiUrl } from "@/config/api"
import { handleApiError } from "@/utils/errorHandler"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"

// Job types as specified in the requirements
const JOB_TYPES = ["Employment", "Internship", "Starting Up"]

// Job titles - restricted to 5 options plus Other
const JOB_TITLES = [
  "Software Engineer",
  "Data Analyst",
  "Product Manager",
  "DevOps Engineer",
  "UI/UX Designer",
  "Other"
]

// Form schema using zod for validation
const formSchema = z.object({
  jobType: z.string().min(1, { message: "Job type is required" }),
  jobTitle: z.string().min(1, { message: "Job title is required" }),
  company: z.string().min(1, { message: "Company name is required" }),
  jobDescription: z.string().optional(),
  location: z.string().min(1, { message: "Location is required" }),
  expectedSalary: z.coerce.number().min(1, { message: "Expected salary is required" }),
  linkedInUrl: z.string().regex(
    /^(https?:\/\/)?(www\.)?linkedin\.com\/(in|company)\/[a-zA-Z0-9_-]+\/?$/,
    { message: "Please provide a valid LinkedIn URL" }
  ),
  contactInfo: z.string().optional(),
  requirements: z.string().optional(),
})

type FormValues = z.infer<typeof formSchema>

interface PostJobDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function PostJobDialog({ open, onOpenChange }: PostJobDialogProps) {
  const { user } = useAuth()
  
  const [otherJobTitle, setOtherJobTitle] = useState<string>("")
  const [isOtherSelected, setIsOtherSelected] = useState<boolean>(false)
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      jobType: "",
      jobTitle: "",
      company: "",
      jobDescription: "",
      location: "",
      expectedSalary: undefined,
      linkedInUrl: "",
      contactInfo: "",
      requirements: "",
    },
  })

  // Handle the "Other" job title selection
  const handleJobTitleChange = (value: string) => {
    if (value === "Other") {
      setIsOtherSelected(true)
      // If "Other" is selected, keep the current custom title if it exists
      if (!otherJobTitle) {
        form.setValue("jobTitle", "")
      }
    } else {
      setIsOtherSelected(false)
      setOtherJobTitle("")
      form.setValue("jobTitle", value)
    }
  }

  // Update the form value when custom job title changes
  const handleOtherJobTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setOtherJobTitle(value)
    form.setValue("jobTitle", value)
  }

  const onSubmit = async (data: FormValues) => {
    try {
      // Process data before sending to API
      const processedData = {
        ...data,
        // Convert empty contactInfo to null
        contactInfo: data.contactInfo?.trim() ? data.contactInfo : null,
        createdBy: user?.name || "",
        createdAt: new Date().toISOString(),
        deleted: false,
      };

      const response = await fetch(buildApiUrl("/v1/jobs"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user?.token || ""}`,
          "Origin": "https://bitsjobsearch.vercel.app"
        },
        body: JSON.stringify(processedData),
      })

      if (!response.ok) {
        const errorResponse = await handleApiError(null, response);
        throw new Error(errorResponse.message);
      }

      toast({
        title: "Success",
        description: "Job posted successfully",
      })
      
      form.reset()
      onOpenChange(false)
    } catch (error) {
      const errorResponse = await handleApiError(error);
      toast({
        title: "Error",
        description: errorResponse.message,
        variant: "destructive",
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Post a New Job</DialogTitle>
          <DialogDescription>
            Fill out the form below to post a new job opportunity.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="jobType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Type*</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select job type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {JOB_TYPES.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Select the type of job opportunity.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div>
                <FormField
                  control={form.control}
                  name="jobTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Job Title*</FormLabel>
                      <Select 
                        onValueChange={handleJobTitleChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select job title" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {JOB_TITLES.map((title) => (
                            <SelectItem key={title} value={title}>
                              {title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Select the specific job title.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {/* Show input field when "Other" is selected */}
                {isOtherSelected && (
                  <div className="mt-2">
                    <FormItem>
                      <FormLabel>Custom Job Title*</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter custom job title" 
                          value={otherJobTitle}
                          onChange={handleOtherJobTitleChange}
                        />
                      </FormControl>
                      <FormDescription>
                        Enter your specific job title.
                      </FormDescription>
                    </FormItem>
                  </div>
                )}
              </div>
            </div>

            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name*</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter company name" {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter the name of the company offering this position.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location*</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Hyderabad, Bangalore, Remote" {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter the job location or specify if remote.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="expectedSalary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expected Salary/Stipend (₹)*</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="Annual salary in INR" 
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    Enter the annual salary in INR.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="linkedInUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>LinkedIn URL</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="https://www.linkedin.com/in/username" 
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    Enter your LinkedIn profile or company page URL.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="contactInfo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Information</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Email, phone number, GForm links or other contact information" 
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    For Phone Numbers, GForm links etc.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="jobDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Describe the job role, responsibilities, and other details..." 
                      className="min-h-[120px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="requirements"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Requirements</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="List the skills, qualifications, and experience required..." 
                      className="min-h-[120px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    Enter each requirement on a new line.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Post Job</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
