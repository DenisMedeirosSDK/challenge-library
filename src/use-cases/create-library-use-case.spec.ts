import { Library } from "../dtos/library-dto";
import { CreateLibraryUseCase } from "./create-library-use-case";

const create = jest.fn();
const findByName = jest.fn();
const findById = jest.fn();
const updateAdmin = jest.fn();
const deleteAdmin = jest.fn();

const createLibraryUseCase = new CreateLibraryUseCase({
  create,
  findByName,
  findById,
  updateAdmin,
  deleteAdmin,
});

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
  it("should throw error when library already exists", async () => {
    const library: Library = {
      name: "Test",
      adminId: "test",
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
    findByName.mockResolvedValue(true);

    await expect(createLibraryUseCase.execute(library)).rejects.toEqual(
      new Error("Library already exists")
    );
  });
});
