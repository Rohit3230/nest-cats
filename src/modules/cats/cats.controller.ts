import { Controller, Get, Query, Post, Body, Put, Param, Delete, UseInterceptors, UseFilters, UseGuards, HttpException, HttpStatus  } from '@nestjs/common';
import { CreateCatDto, UpdateCatDto, ListAllEntities } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';
import { ForbiddenException } from '../../common/middleware/forbidden.exception';
import { HttpExceptionFilter } from '../../common/middleware/http-exception.filter';
import { ParseIntPipe } from '../../common/middleware/parse-int.pipe';
import { AuthGuard } from '../../common/middleware/auth.guard';
// import { RolesGuard } from '../../common/middleware/roles.guard';
// import { LoggingInterceptor } from '../../common/middleware/logging.interceptor';

@Controller('cats')
@UseFilters(new HttpExceptionFilter())
@UseGuards(AuthGuard)
// @UseInterceptors(LoggingInterceptor)
// @UseGuards(new RolesGuard())
export class CatsController {
  constructor(private catsService: CatsService) {}

   // working
  // @Post()
  // async create(@Body() createCatDto: CreateCatDto) {
  //   // return 'This action adds a new cat';
  //   this.catsService.create(createCatDto);
  // }

  // @Post()
  // @UseFilters(new HttpExceptionFilter())
  // async create(@Body() createCatDto: CreateCatDto) {
  //   throw new ForbiddenException();
  // }

  @Post()
@UseFilters(HttpExceptionFilter)
async create(@Body() createCatDto: CreateCatDto) {
  throw new ForbiddenException();
}


//   @Get()
//   findAll(@Query() query: ListAllEntities) {
//       // http://localhost:3000/cats/?limit=1
//     return `This action returns all cats (limit: ${query.limit} items)`;
//   }
    @Get()
    async findAll(): Promise<Cat[]> {
        console.log('INIT findAll****');
        return this.catsService.findAll();
    }
    // async findAll() {
    //   console.log('INIT findAll****');
    //   throw new ForbiddenException();

    //   // working code
    //   // throw new HttpException({
    //     //   status: HttpStatus.FORBIDDEN,
    //     //   error: 'This is a custom message',
    //     // }, HttpStatus.FORBIDDEN);
    //   }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //     // http://localhost:3000/cats/id=1
  //   return `This action returns a #${id} cat`;
  // }
  @Get(':id')
  async findOne(@Param('id', new ParseIntPipe()) id) {
    return this.catsService.findOne(id);
  }


  // @Get('/userInfo')
  // async findOne(@User() user: UserEntity) {
  //   console.log(user);
  // }


  @Put(':id')
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    return `This action updates a #${id} cat`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} cat`;
  }
}