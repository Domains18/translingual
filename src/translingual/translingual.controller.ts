import { Body, Controller, Post, Logger } from '@nestjs/common';
import { TranslingualService } from './translingual.service';
import { translingualDto } from './dto/translingualDto';

@Controller('app')
export class TranslingualController {
    private readonly logger = new Logger(TranslingualController.name);

    constructor(private readonly translingualService: TranslingualService) {}

    @Post('/message')
    async message(@Body() translingualDto: translingualDto) {
        this.logger.log(`Received message: ${translingualDto.message}`);

        // Create the message and run the assistant
        const messageResponse = await this.translingualService.addMessage(
            translingualDto.threadId,
            translingualDto.message,
        );

        if (!messageResponse) {
            return { message: 'Failed to add message.' };
        }

        const assistantRun = await this.translingualService.runAssistant(translingualDto.threadId);

        const runId = assistantRun.id;

        // Wait for the assistant's run to complete and poll status
        return new Promise((resolve, reject) => {
            const pollingInterval = setInterval(async () => {
                try {
                    const statusResponse = await this.translingualService.checkingStatus(
                        translingualDto.threadId,
                        runId,
                    );

                    if (statusResponse?.messages) {
                        clearInterval(pollingInterval);
                        resolve(statusResponse); // Return the messages when completed
                    }
                } catch (error) {
                    clearInterval(pollingInterval);
                    this.logger.error('Error while polling status:', error);
                    reject(new Error('Failed to get response from assistant.'));
                }
            }, 5000);
        });
    }
}
