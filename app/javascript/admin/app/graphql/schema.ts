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

export type DepartmentCreateMutationVariables = {
  department: DepartmentInputType,
};

export type DepartmentCreateMutation = {
  // Create Department.
  department_create:  {
    id: string,
    name: string,
  } | null,
};

export type DepartmentDestroyMutationVariables = {
  id: string,
};

export type DepartmentDestroyMutation = {
  // Destroy Department.
  department_destroy:  {
    id: string,
  } | null,
};

export type DepartmentGetQueryVariables = {
  id: string,
};

export type DepartmentGetQuery = {
  // Find a Department by ID
  department_get:  {
    id: string,
    name: string,
    positions:  Array< {
      id: string,
      name: string,
    } > | null,
    children:  Array< {
      id: string,
      name: string,
      positions:  Array< {
        id: string,
        name: string,
      } > | null,
    } > | null,
  } | null,
};

export type DepartmentIndexQueryVariables = {
  parent_id?: string | null,
};

export type DepartmentIndexQuery = {
  // List of Departments
  department_index:  Array< {
    id: string,
    name: string,
  } >,
};

export type DepartmentUpdateMutationVariables = {
  id: string,
  department: DepartmentInputType,
};

export type DepartmentUpdateMutation = {
  // Update Department.
  department_update:  {
    id: string,
    name: string,
    description: string | null,
  } | null,
};

export type PositionCreateMutationVariables = {
  position: PositionInputType,
};

export type PositionCreateMutation = {
  // Create Position.
  position_create:  {
    id: string,
    name: string,
  } | null,
};

export type PositionDestroyMutationVariables = {
  id: string,
};

export type PositionDestroyMutation = {
  // Destroy Position.
  position_destroy:  {
    id: string,
  } | null,
};

export type PositionGetQueryVariables = {
  id: string,
};

export type PositionGetQuery = {
  // Find a Position by ID
  position_get:  {
    id: string,
    name: string,
    people:  Array< {
      id: string,
      firstname: string | null,
      lastname: string | null,
    } > | null,
  } | null,
};

export type PositionIndexQueryVariables = {
  department_id?: string | null,
};

export type PositionIndexQuery = {
  // List of Positions
  position_index:  Array< {
    id: string,
    name: string,
  } >,
};

export type PositionUpdateMutationVariables = {
  id: string,
  position: PositionInputType,
};

export type PositionUpdateMutation = {
  // Update Position.
  position_update:  {
    id: string,
    name: string,
    description: string | null,
  } | null,
};
/* tslint:enable */
