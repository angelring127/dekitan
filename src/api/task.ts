import axiosInstance from './axios'

export interface Task {
  id: number
  title: string
  updated_at: string
}

export interface TaskResponse {
  status: number
  message: string
  data: {
    list: Task[]
  }
}

export interface GetTasksParams {
  player_id: number
  kind?: number
  status?: number
}

export interface UpdateTaskStatusParams {
  player_id: number
  task_id: number
  status: number
}

export interface UpdateTaskStatusResponse {
  status: number
  message: string
}

export interface TaskDetailResponse {
  status: number
  message: string
  data: {
    title: string
    point: number
    kind: number
    detail?: {
      answer: number
      free_text?: string
      answers: string[]
    }
  }
}

export interface GetTaskDetailParams {
  player_id: number
  task_id: number
}

export interface CheckSpecialPointParams {
  player_id: number
}

export interface CheckSpecialPointResponse {
  status: number
  message: string
  data: {
    result: boolean
  }
}

export interface AddPointParams {
  player_id: number
  task_id: number
  point: number
}

export interface AddPointResponse {
  status: number
  message: string
  data: Record<string, never>
}

/**
 * ユーザーが保有するタスク一覧を取得します。
 * @param params リクエストパラメータ
 * @returns タスク一覧のレスポンス
 */
export const getTasks = async (params: GetTasksParams): Promise<TaskResponse> => {
  try {
    const response = await axiosInstance.post<TaskResponse>('/event/task/gets', params)
    return response.data
  } catch (error) {
    console.error('タスク一覧の取得中にエラーが発生しました:', error)
    throw error
  }
}

/**
 * タスクのステータスを更新します。
 * @param params リクエストパラメータ
 * @returns 更新結果のレスポンス
 */
export const updateTaskStatus = async (
  params: UpdateTaskStatusParams
): Promise<UpdateTaskStatusResponse> => {
  try {
    const response = await axiosInstance.post<UpdateTaskStatusResponse>('/event/task/put', params)
    return response.data
  } catch (error) {
    console.error('タスクステータスの更新中にエラーが発生しました:', error)
    throw error
  }
}

/**
 * タスクの詳細情報を取得します。
 * @param params リクエストパラメータ
 * @returns タスク詳細のレスポンス
 */
export const getTaskDetail = async (params: GetTaskDetailParams): Promise<TaskDetailResponse> => {
  try {
    const response = await axiosInstance.post<TaskDetailResponse>('/event/task/get', params)
    return response.data
  } catch (error) {
    console.error('タスク詳細の取得中にエラーが発生しました:', error)
    throw error
  }
}

/**
 * 특별 포인트 부여 가능 여부를 확인합니다.
 * @param params 리퀘스트 파라미터
 * @returns 특별 포인트 부여 가능 여부 응답
 */
export const checkSpecialPoint = async (
  params: CheckSpecialPointParams
): Promise<CheckSpecialPointResponse> => {
  try {
    const response = await axiosInstance.post<CheckSpecialPointResponse>(
      '/award/point/approve',
      params
    )
    return response.data
  } catch (error) {
    console.error('특별 포인트 부여 가능 여부 확인 중 에러 발생:', error)
    throw error
  }
}

/**
 * 포인트를 부여합니다.
 * @param params 리퀘스트 파라미터
 * @returns 포인트 부여 결과 응답
 */
export const addPoint = async (params: AddPointParams): Promise<AddPointResponse> => {
  try {
    const response = await axiosInstance.post<AddPointResponse>('/award/point/add', params)
    return response.data
  } catch (error) {
    console.error('포인트 부여 중 에러 발생:', error)
    throw error
  }
}
