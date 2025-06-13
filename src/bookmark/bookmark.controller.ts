import { Controller, Get, Patch, Body, UseGuards, Delete, Post, Param, ParseIntPipe } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { GetUser } from 'src/auth/decorator';
import { BookmarkService } from './bookmark.service';
import { CreateBookmarkDto, EditBookmarkDto } from './dto';


@UseGuards(JwtGuard)
@Controller('bookmarks')
export class BookmarkController {
    constructor(private bookmarkService: BookmarkService){}

    @Get()
    getBookmarks(@GetUser('id') userId: number) {
        return this.bookmarkService.getBookmarks(userId);
    }

    @Get(':id')
    getBookmarkById(@GetUser('id') userId: number, @Param('id', ParseIntPipe) bookmarkId: number) {
        return this.bookmarkService.getBookmarkById(userId, bookmarkId);
    }

    @Patch(':id')
    editBookmarkById(@GetUser('id') userId: number, @Param('id', ParseIntPipe) bookmarkId: number, @Body() dto: EditBookmarkDto) {
        return this.bookmarkService.editBookmarkById(userId, bookmarkId, dto);
    }

    @Delete(':id')
    deleteBookmarkById(@GetUser('id') userId: number, @Param('id', ParseIntPipe) bookmarkId: number) {
        return this.bookmarkService.deleteBookmarkById(userId, bookmarkId);
    }

    @Post()
    createBookmark(@GetUser('id') userId: number, @Body() dto: CreateBookmarkDto) {
        return this.bookmarkService.createBookmark(userId, dto);
    }
}
