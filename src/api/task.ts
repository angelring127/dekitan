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
