import type { PermissionRepository } from "../permission.repository.port.js";
import { PermissionService } from "../permission.service.js";

const permissionRepo = {
  getAllPermissions: vi.fn(),
  checkPermissionExistBySlug: vi.fn(),
} as unknown as PermissionRepository;

const permissionService = new PermissionService(permissionRepo);

describe("Permission Service Test", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should get all permissions", async () => {
    const mockPermission = [
      {
        id: 1,
        slug: "expense:create",
        description: "Can create a new expense",
      },
      {
        id: 2,
        slug: "expense:read",
        description: "Can view expenses",
      },
    ];

    vi.mocked(permissionRepo.getAllPermissions).mockResolvedValue(mockPermission);
    const result = await permissionService.getAllPermissions();

    expect(result).toEqual(mockPermission);
  });

  it("should check if permission exist", async () => {
    const slug = "workspace:create";

    vi.mocked(permissionRepo.checkPermissionExistBySlug).mockResolvedValue(true);
    const result = await permissionService.checkIfPermissionExist(slug);

    expect(permissionRepo.checkPermissionExistBySlug).toHaveBeenCalledWith(slug);
    expect(result).toEqual(true);
  });

  it("should reject permission not found", async () => {
    const slug = "not found";

    vi.mocked(permissionRepo.checkPermissionExistBySlug).mockResolvedValue(false);
    const result = await permissionService.checkIfPermissionExist(slug);

    expect(permissionRepo.checkPermissionExistBySlug).toHaveBeenCalledWith(slug);
    expect(result).toEqual(false);
  });
});
