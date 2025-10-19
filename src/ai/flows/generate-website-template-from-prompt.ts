'use server';
/**
 * @fileOverview A flow to generate a website template from a prompt.
 *
 * - generateWebsiteTemplateFromPrompt - A function that generates a website template from a prompt.
 * - GenerateWebsiteTemplateFromPromptInput - The input type for the generateWebsiteTemplateFromPrompt function.
 * - GenerateWebsiteTemplateFromPromptOutput - The return type for the generateWebsiteTemplateFromPrompt function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateWebsiteTemplateFromPromptInputSchema = z.object({
  prompt: z
    .string()
    .describe('A description of the type of website to generate.'),
});
export type GenerateWebsiteTemplateFromPromptInput = z.infer<
  typeof GenerateWebsiteTemplateFromPromptInputSchema
>;

const GenerateWebsiteTemplateFromPromptOutputSchema = z.object({
  websiteStructure: z
    .string()
    .describe('The generated website structure in HTML/CSS format.'),
});
export type GenerateWebsiteTemplateFromPromptOutput = z.infer<
  typeof GenerateWebsiteTemplateFromPromptOutputSchema
>;

export async function generateWebsiteTemplateFromPrompt(
  input: GenerateWebsiteTemplateFromPromptInput
): Promise<GenerateWebsiteTemplateFromPromptOutput> {
  return generateWebsiteTemplateFromPromptFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateWebsiteTemplateFromPromptPrompt',
  input: {schema: GenerateWebsiteTemplateFromPromptInputSchema},
  output: {schema: GenerateWebsiteTemplateFromPromptOutputSchema},
  prompt: `You are an expert website designer. You will generate a basic website structure in HTML/CSS format based on the user's description.

Description: {{{prompt}}}

Website Structure:`,
});

const generateWebsiteTemplateFromPromptFlow = ai.defineFlow(
  {
    name: 'generateWebsiteTemplateFromPromptFlow',
    inputSchema: GenerateWebsiteTemplateFromPromptInputSchema,
    outputSchema: GenerateWebsiteTemplateFromPromptOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
