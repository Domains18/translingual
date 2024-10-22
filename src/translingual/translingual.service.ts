import { Injectable, Logger, HttpException } from '@nestjs/common';
import OpenAI from 'openai';

const { API_KEY, ASSISTANT_ID} = process.env


const openai = new OpenAI({
  apiKey:'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',
});


const assistantId = 'asst_p7wewkPrM0T8BBgwCtXVcbbX';

let pollingInterval;


@Injectable()
export class TranslingualService {
    private readonly logger = new Logger(TranslingualService.name);

    async createThread() {
        this.logger.log('Creating thread');
        const thread = await openai.beta.threads.create();
        return thread;
    }

    async addMessage(threadId: string, message: string) {
        this.logger.log('Adding message');
        const response = await openai.beta.threads.messages.create(threadId, {
            role: 'user',
            content: message,
        });
        return response;
    }

    async runAssistant(threadId: string) {
        this.logger.log('Running assistant');
        const response = await openai.beta.threads.runs.create(threadId, {
            assistant_id: assistantId,
        });

        return response;
    }

    async checkingStatus(threadId: string, runId: string) {
        const runObject = await openai.beta.threads.runs.retrieve(threadId, runId);

        const status = runObject.status;
        this.logger.log(`Current status: ${status}`);

        if (status === 'completed') {
            // Clear polling handled at the controller level
            const messageList = await openai.beta.threads.messages.list(threadId);
            const messages = messageList.data.map((message) => message.content);

            return { messages };
        }

        return null; // Return null if not yet completed
    }
}
