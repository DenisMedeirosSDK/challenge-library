import { Library } from "../dtos/library-dto";
import { CreateLibraryUseCase } from "./create-library-use-case";

const create = jest.fn();
const findByName = jest.fn();

const createLibraryUseCase = new CreateLibraryUseCase({ create, findByName });

describe("Create Library Use Case", () => {
  it("should be defined", () => {
    expect(CreateLibraryUseCase).toBeDefined();
  });
  it("should call create method", async () => {
    const library: Library = {
      name: "Test",
      adminId: "adminId",
      address: {
        street: "street",
        city: "city",
        state: "state",
        zip: "zip",
        streetNumber: "streetNumber",
        complement: "complement",
        latitude: "latitude",
        longitude: "longitude",
      },
    };
    await createLibraryUseCase.execute(library);
    expect(create).toHaveBeenCalledWith(library);
  });
  it("should be able to create new library", async () => {
    const library: Library = {
      name: "Test",
      adminId: "adminId",
      address: {
        street: "street",
        city: "city",
        state: "state",
        zip: "zip",
        streetNumber: "streetNumber",
        complement: "complement",
        latitude: "latitude",
        longitude: "longitude",
      },
    };
    await expect(createLibraryUseCase.execute(library)).resolves.not.toThrow();
  });
  it("should throw error when name is not provided", async () => {
    const library: Library = {
      name: "",
      adminId: "adminId",
      address: {
        street: "street",
        city: "city",
        state: "state",
        zip: "zip",
        streetNumber: "streetNumber",
        complement: "complement",
        latitude: "latitude",
        longitude: "longitude",
      },
    };
    await expect(createLibraryUseCase.execute(library)).rejects.toThrow();
  });
});
