import { Test } from "@nestjs/testing";
import * as pactum from 'pactum';
import { AppModule } from "../src/app.module";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "src/auth/dto";
import { EditUserDto } from "src/user/dto";

describe('App e2e', () => {
  let app:INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      })
    )
    await app.init();
    await app.listen(3333);

    prisma = app.get(PrismaService);
    await prisma.cleanDb();
    pactum.request.setBaseUrl("http://localhost:3333");
  });

  afterAll(()=>{
    app.close();
  })

  describe('Auth', () => { 
    const dto: AuthDto = {
          email: "test@test.com",
          password: "12345"
    }

    describe('Signup', () => {
      describe('Should throw if email is empty', () => {
      it("Should signup", () => {
        return pactum.spec().post("/auth/signup",)
        .withBody({
          password: dto.password
        })
        .expectStatus(400);
      });
    });

    describe('Should throw if password is empty', () => {
      it("Should signup", () => {
        return pactum.spec().post("/auth/signup",)
        .withBody({
          email: dto.email
        })
        .expectStatus(400);
      });
    });

    describe('Should throw if no body', () => {
      it("Should signup", () => {
        return pactum.spec().post("/auth/signup",)
        .expectStatus(400);
      });
    });
      it("Should signup", () => {
        return pactum.spec().post("/auth/signup",)
        .withBody(dto)
        .expectStatus(201);
      });
    });

    describe('Signin', () => {
        describe('Should throw if email is empty', () => {
        it("Should signup", () => {
          return pactum.spec().post("/auth/signin",)
          .withBody({
            password: dto.password
          })
          .expectStatus(400);
        });
      });

      describe('Should throw if password is empty', () => {
        it("Should signup", () => {
          return pactum.spec().post("/auth/signin",)
          .withBody({
            email: dto.email
          })
          .expectStatus(400);
        });
      });

      describe('Should throw if no body', () => {
        it("Should signup", () => {
          return pactum.spec().post("/auth/signin",)
          .expectStatus(400);
        });
      });

      it("Should signin", () => {
        return pactum.spec().post("/auth/signin",)
        .withBody(dto)
        .expectStatus(201)
        .stores('userAt', "access_token");
      });
    });

   });

  describe('User', () => { 
    describe('Get me', () => {
      it("Should get current user", () => {
        return pactum.spec()
        .get("/users/me",)
        .withBearerToken('$S{userAt}')
        .expectStatus(200);
      });
    });

    describe('Edit user', () => {
      const dto: EditUserDto = {
          firstName: "test first name",
          email: "update@test.com",
      }

      it("Should update current user", () => {
        return pactum.spec()
        .patch("/users",)
        .withBody(dto)
        .withBearerToken('$S{userAt}')
        .expectStatus(200)
        .expectBodyContains(dto.email)
        .expectBodyContains(dto.firstName);
      });
    });
  });

  describe('Bookmarks', () => {
    describe('Create bookmarks', () => {
      
    });

    describe('Get bookmarks', () => {
      
    });

    describe('Get bookmark by id', () => {
      
    });

    describe('Edit bookmark', () => {
      
    });

    describe('Delete bookmark', () => {
      
    });
   });


});