/* tslint:disable */
//  This file was automatically generated and should not be edited.

export type DepartmentInputType = {
  // Name of the department.
  name?: string | null,
  // Description of the post.
  description?: string | null,
  // ID of the parent department.
  parent_id?: string | null,
};

export type PositionInputType = {
  // Name of the Position.
  name?: string | null,
  // Description of the position.
  description?: string | null,
  // ID of the parent Department.
  department_id?: string | null,
};

export type departmentCreateMutationVariables = {
  department: DepartmentInputType,
};

export type departmentCreateMutation = {
  // Create Department.
  department_create:  {
    id: string,
    name: string,
  } | null,
};

export type departmentDestroyMutationVariables = {
  id: string,
};

export type departmentDestroyMutation = {
  // Destroy Department.
  department_destroy:  {
    id: string,
  } | null,
};

export type departmentGetQueryVariables = {
  id: string,
};

export type departmentGetQuery = {
  // Find a Department by ID
  department_get:  {
    id: string,
    name: string,
    positions:  Array< {
      id: string,
      name: string,
    } | null > | null,
    children:  Array< {
      id: string,
      name: string,
      positions:  Array< {
        id: string,
        name: string,
      } | null > | null,
    } | null > | null,
  } | null,
};

export type departmentIndexQueryVariables = {
  parent_id?: string | null,
};

export type departmentIndexQuery = {
  // List of Departments
  department_index:  Array< {
    id: string,
    name: string,
  } | null >,
};

export type departmentUpdateMutationVariables = {
  id: string,
  department: DepartmentInputType,
};

export type departmentUpdateMutation = {
  // Update Department.
  department_update:  {
    id: string,
    name: string,
    description: string | null,
  } | null,
};

export type organizationIndexQuery = {
  // List of Organizations
  organization_index:  Array< {
    id: string,
    name: string,
  } | null >,
};

export type positionCreateMutationVariables = {
  position: PositionInputType,
};

export type positionCreateMutation = {
  // Create Position.
  position_create:  {
    id: string,
    name: string,
  } | null,
};

export type positionDestroyMutationVariables = {
  id: string,
};

export type positionDestroyMutation = {
  // Destroy Position.
  position_destroy:  {
    id: string,
  } | null,
};

export type positionGetQueryVariables = {
  id: string,
};

export type positionGetQuery = {
  // Find a Position by ID
  position_get:  {
    id: string,
    name: string,
    people:  Array< {
      id: string,
      firstname: string | null,
      lastname: string | null,
    } | null > | null,
  } | null,
};

export type positionIndexQueryVariables = {
  department_id?: string | null,
};

export type positionIndexQuery = {
  // List of Positions
  position_index:  Array< {
    id: string,
    name: string,
  } | null >,
};

export type positionUpdateMutationVariables = {
  id: string,
  position: PositionInputType,
};

export type positionUpdateMutation = {
  // Update Position.
  position_update:  {
    id: string,
    name: string,
    description: string | null,
  } | null,
};
