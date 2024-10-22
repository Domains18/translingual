import { Injectable, Logger, HttpException } from '@nestjs/common';
import OpenAI from 'openai';

const { API_KEY, ASSISTANT_ID} = process.env


const openai = new OpenAI({
    apiKey: API_KEY,
});


const assistantId = ASSISTANT_ID;

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
            const messageList = await openai.beta.threads.messages.list(threadId);
            const messages = messageList.data.map((message) => message.content);

            return { messages };
        }

        return null; // Return null if not yet completed
    }
}
